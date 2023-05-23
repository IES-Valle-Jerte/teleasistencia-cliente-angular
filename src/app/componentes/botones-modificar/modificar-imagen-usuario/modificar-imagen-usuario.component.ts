import { Component, OnInit } from '@angular/core';
import {IUsers} from "../../../interfaces/i-users";
import {IGrupo} from "../../../interfaces/i-grupo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {CargaUserService} from "../../../servicios/carga-user.service";
import {CargaGrupoService} from "../../../servicios/carga-grupo.service";
import {AuthService} from "../../../servicios/auth.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-modificar-imagen-usuario',
  templateUrl: './modificar-imagen-usuario.component.html',
  styleUrls: ['./modificar-imagen-usuario.component.scss']
})
export class ModificarImagenUsuarioComponent implements OnInit {
  public user: IUsers;
  public idUser: number;
  public grupos: IGrupo[];
  public img:string;
  public imgNull:string
  public formModificarU: FormGroup;

  constructor(private route: ActivatedRoute, private titleService: Title, private cargaUsers: CargaUserService, private router: Router, private cargaGrupo : CargaGrupoService, private formBuilder: FormBuilder, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.idUser = this.route.snapshot.params['id'];
    this.titleService.setTitle('Modificar usuario ' + this.idUser);

    const imagen=localStorage.getItem('img')
    if(imagen==='null'){
      this.imgNull=imagen
    }else{
      this.img= localStorage.getItem('img');
    }
    this.formModificarU = this.formBuilder.group({
      imagen: ['',Validators.required],
    });
  }

  optionSelected(i: number): void {
    document.getElementsByClassName('grupo_option')[i].setAttribute('selected', '');
  }

  modificarUser(): void {
    const myFormData = new FormData();
    console.log(this.formModificarU)
    for ( let key in  this.formModificarU.controls) {
      myFormData.append(key, this.formModificarU.get(key).value);
    }
    this.cargaUsers.modificarProfile(myFormData,this.idUser).subscribe(
      e => {
        localStorage.setItem('img', e.imagen.imagen);
        document.querySelector("header img.rounded-circle")["src"] = e.imagen.imagen
        this.alertExito()
      },
      error => {
        this.alertError()
      }
    );
  }
  onFileChanged(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.img = String( reader.result );
      reader.readAsDataURL(file);
      this.formModificarU.controls.imagen.setValue(file)
    }
  }
  //Toast para el Alert indicando que la operación fue exitosa
  alertExito() :void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      //El tiempo que permanece la alerta, se obtiene mediante una variable global en environment.ts
      timer: environment.timerToast,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: environment.fraseModificar,
    })
  }
  //Toast para el alert indicando que hubo algún error en la operación
  alertError() :void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: environment.timerToast,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: environment.fraseErrorModificar
    })
  }
}
