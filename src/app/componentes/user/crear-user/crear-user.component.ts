import {Component, OnInit} from '@angular/core';
import {IUsers} from '../../../interfaces/i-users';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {CargaUserService} from '../../../servicios/carga-user.service';
import {User} from '../../../clases/user';
import Swal from "sweetalert2";
import {IRecursoComunitario} from "../../../interfaces/i-recurso-comunitario";
import {IGrupo} from "../../../interfaces/i-grupo";
import {Grupo} from "../../../clases/grupo";
import {CargaGrupoService} from "../../../servicios/carga-grupo.service";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.scss']
})

export class CrearUserComponent implements OnInit {
  public user: IUsers;
  public grupos: IGrupo[];
  public confirmpassword: string;
  public formCrearU: FormGroup;

  constructor(private titleService: Title, private route: ActivatedRoute, private cargaUsers: CargaUserService, private router: Router,private cargaGrupo :CargaGrupoService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Nuevo usuario del sistema');
    this.user = new User();
    this.cargaGrupo.getGroup().subscribe(
      resp=>{
      this.grupos  = resp
      console.log(this.grupos)
      }
    )
    this.confirmpassword="";
    this.formCrearU = this.formBuilder.group({
      password: ['',Validators.required],
      confirmpassword: ['',Validators.required,],
      username:  ['',[Validators.required,Validators.min(4),Validators.pattern('^[a-zA-Z0-9](_(?!(\\.|_))|\\.(?!(_|\\.))|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$')]],
      first_name: ['',[Validators.required,Validators.max(200),Validators.pattern('^[\\w\'\\-,.][^0-9_!¡?÷?¿(\\)\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$')]],
      last_name: ['',[Validators.required,Validators.max(200),Validators.pattern('^[\\w\'\\-,.][^0-9_!¡?÷?¿(\\)\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$')]],
      email: ['',[Validators.required,Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      groups: ['',Validators.required],
      imagen: ['']
    });
  }

  nuevoUser(): void {
    const myFormData = new FormData();
    console.log(this.formCrearU)
    for ( let key in  this.formCrearU.controls) {
      myFormData.append(key, this.formCrearU.get(key).value);
    }
    this.cargaUsers.nuevoUser(myFormData).subscribe(
      e => {
        this.alertExito()
        this.router.navigate(['/usuarios']);
      },
      error => {
        this.alertError()
      }
    );
  }
  onFileChanged(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.formCrearU.controls.imagen.setValue(file)
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
      title: environment.fraseCrear,
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
      title: environment.fraseErrorCrear
    })
  }
  //variable necesaria para ocultar/mostrar la contraseña
  hide = false;
}
