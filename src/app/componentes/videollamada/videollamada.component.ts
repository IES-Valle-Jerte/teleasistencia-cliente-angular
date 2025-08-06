import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-videollamada',
  templateUrl: './videollamada.component.html',
  styleUrls: ['./videollamada.component.scss']
})
export class VideollamadaComponent implements AfterViewInit {
  @ViewChild('localVideo') localVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideoRef!: ElementRef<HTMLVideoElement>;

  estadoLlamada: 'inactivo' | 'llamando' | 'entrante' | 'en-llamada' = 'inactivo';

  private peerConnection!: RTCPeerConnection;
  private localStream!: MediaStream;
  private socket!: WebSocket;
  private iceBuffer: RTCIceCandidate[] = [];

  private audioEntrante = new Audio('assets/sounds/llamada-entrante.mp3');
  private audioSaliente = new Audio('assets/sounds/llamada-saliente.mp3');

  async ngAfterViewInit() {
    this.audioEntrante.loop = true;
    this.audioSaliente.loop = true;
    await this.iniciarSocket();
  }

  async iniciarCamara() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localVideoRef.nativeElement.srcObject = this.localStream;
  }

  async iniciarSocket() {
    const sala = 'sala123';
    this.socket = new WebSocket(`${environment.urlWebsocketVideoLlamada}${sala}/`);

    this.socket.onmessage = async (event) => {
      const mensaje = JSON.parse(event.data);

      switch (mensaje.type) {
        case 'llamando':
          this.estadoLlamada = 'entrante';
          this.audioEntrante.play().catch(() => {});
          break;

        case 'aceptar':
          this.detenerTonos();
          await this.iniciarCamara();
          await this.crearConexion(true);
          break;

        case 'rechazar':
          this.detenerTonos();
          this.estadoLlamada = 'inactivo';
          alert('La otra persona rechazó la llamada.');
          break;

        case 'offer':
          this.detenerTonos();
          await this.iniciarCamara();
          this.crearPeerConnection();
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(mensaje.offer));
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);
          this.socket.send(JSON.stringify({ type: 'answer', answer }));
          this.estadoLlamada = 'en-llamada';

          // Añadir ICE candidates almacenados
          this.iceBuffer.forEach(async candidate => {
            await this.peerConnection.addIceCandidate(candidate);
          });
          this.iceBuffer = [];
          break;

        case 'answer':
          this.detenerTonos();
          if (this.peerConnection.signalingState === 'have-local-offer') {
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(mensaje.answer));
            this.estadoLlamada = 'en-llamada';
          } else {
            console.warn('Respuesta recibida en un estado inválido:', this.peerConnection.signalingState);
          }
          break;

        case 'ice':
          try {
            if (this.peerConnection && this.peerConnection.remoteDescription) {
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(mensaje.candidate));
            } else {
              console.warn('ICE descartado: remoteDescription es null, se guarda en buffer');
              this.iceBuffer.push(new RTCIceCandidate(mensaje.candidate));
            }
          } catch (err) {
            console.error('Error ICE', err);
          }
          break;

        case 'finalizar':
          this.detenerTonos();
          this.finalizarLlamada(true);
          break;
      }
    };
  }

  crearPeerConnection() {
    const config = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
        { urls: 'stun:stun.services.mozilla.com' },
        { urls: 'stun:stun.stunprotocol.org:3478' }
      ]
    };

    this.peerConnection = new RTCPeerConnection(config);

    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.peerConnection.ontrack = (event) => {
      this.remoteVideoRef.nativeElement.srcObject = event.streams[0];
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.send(JSON.stringify({ type: 'ice', candidate: event.candidate }));
      }
    };
  }

  async crearConexion(esQuienLlama: boolean) {
    this.crearPeerConnection();

    if (esQuienLlama) {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      this.socket.send(JSON.stringify({ type: 'offer', offer }));
    }
  }

  async iniciarLlamada() {
    this.estadoLlamada = 'llamando';
    await this.iniciarCamara();
    this.audioSaliente.play().catch(() => {});
    this.socket.send(JSON.stringify({ type: 'llamando' }));
  }

  async aceptarLlamada() {
    this.detenerTonos();
    await this.iniciarCamara();
    this.socket.send(JSON.stringify({ type: 'aceptar' }));
    await this.crearConexion(false);
    this.estadoLlamada = 'en-llamada';
  }

  rechazarLlamada() {
    this.detenerTonos();
    this.socket.send(JSON.stringify({ type: 'rechazar' }));
    this.estadoLlamada = 'inactivo';
    this.liberarRecursos();
  }

  cancelarLlamada() {
    this.detenerTonos();
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null!;
    }
    this.socket.send(JSON.stringify({ type: 'rechazar' }));
    this.estadoLlamada = 'inactivo';
    this.liberarRecursos();
  }

  finalizarLlamada(remoto = false) {
    this.detenerTonos();

    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null!;
    }

    if (!remoto) {
      this.socket.send(JSON.stringify({ type: 'finalizar' }));
    }

    this.estadoLlamada = 'inactivo';
    this.liberarRecursos();
  }

  private liberarRecursos() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null!;
    }
    if (this.localVideoRef && this.localVideoRef.nativeElement) {
      this.localVideoRef.nativeElement.srcObject = null;
      this.localVideoRef.nativeElement.pause();
      this.localVideoRef.nativeElement.src = '';
    }
    if (this.remoteVideoRef && this.remoteVideoRef.nativeElement) {
      this.remoteVideoRef.nativeElement.srcObject = null;
      this.remoteVideoRef.nativeElement.pause();
      this.remoteVideoRef.nativeElement.src = '';
    }
  }

  private detenerTonos() {
    this.audioEntrante.pause();
    this.audioEntrante.currentTime = 0;
    this.audioSaliente.pause();
    this.audioSaliente.currentTime = 0;
  }
}