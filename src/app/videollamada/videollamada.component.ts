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

  private peerConnection!: RTCPeerConnection;
  private localStream!: MediaStream;
  private socket!: WebSocket;

  async ngAfterViewInit() {
    await this.iniciarSocket();
    await this.iniciarCamara();
  }

  async iniciarCamara() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localVideoRef.nativeElement.srcObject = this.localStream;
  }

  async iniciarSocket() {
    const sala = 'sala123';  // puedes parametrizarla más adelante
    this.socket = new WebSocket(`${environment.urlWebsocket}/${sala}/`);

    this.socket.onmessage = async (event) => {
      const mensaje = JSON.parse(event.data);

      if (mensaje.type === 'offer') {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(mensaje.offer));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.socket.send(JSON.stringify({ type: 'answer', answer }));
      } else if (mensaje.type === 'answer') {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(mensaje.answer));
      } else if (mensaje.type === 'ice') {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(mensaje.candidate));
      }
    };
  }

  async iniciarLlamada() {
    const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    this.peerConnection = new RTCPeerConnection(config);

    // Agrega las pistas de la cámara
    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    // Mostrar video remoto
    this.peerConnection.ontrack = (event) => {
      this.remoteVideoRef.nativeElement.srcObject = event.streams[0];
    };

    // Candidatos ICE
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.send(JSON.stringify({ type: 'ice', candidate: event.candidate }));
      }
    };

    // Crear oferta y enviarla
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.socket.send(JSON.stringify({ type: 'offer', offer }));
  }
}
