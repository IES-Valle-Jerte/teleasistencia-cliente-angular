import {Component, OnInit} from '@angular/core';
import {IUsers} from '../../../interfaces/i-users';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CargaUserService} from '../../../servicios/carga-user.service';
import Swal from "sweetalert2";
import {IGrupo} from "../../../interfaces/i-grupo";
import {CargaGrupoService} from "../../../servicios/carga-grupo.service";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modificar-user',
  templateUrl: './modificar-user.component.html',
  styleUrls: ['./modificar-user.component.scss']
})

export class ModificarUserComponent implements OnInit {
  public user: IUsers;
  public idUser: number;
  public grupos: IGrupo[];
  public formModificarU: FormGroup;

  constructor(private route: ActivatedRoute, private titleService: Title, private cargaUsers: CargaUserService, private router: Router, private cargaGrupo : CargaGrupoService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.idUser = this.route.snapshot.params['id'];
    this.titleService.setTitle('Modificar usuario ' + this.idUser);
    this.cargaGrupo.getGroup().subscribe(
      resp=>{
        this.grupos  = resp
      }
    )
    console.log(this.user);

    this.user.groups = this.user.groups[0].id;

    this.formModificarU = this.formBuilder.group({
      username:  [this.user.username,[Validators.required,Validators.min(4),Validators.pattern('^[a-zA-Z0-9](_(?!(\\.|_))|\\.(?!(_|\\.))|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$')]],
      first_name: [this.user.first_name,[Validators.required,Validators.max(200),Validators.pattern('^[\\w\'\\-,.][^0-9_!¡?÷?¿(\\)\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$')]],
      last_name: [this.user.last_name,[Validators.required,Validators.max(200),Validators.pattern('^[\\w\'\\-,.][^0-9_!¡?÷?¿(\\)\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$')]],
      email: [this.user.email,[Validators.required,Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      groups: [this.user.groups,Validators.required],
      imagen: ['']
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
    this.cargaUsers.modificarUser(myFormData,this.idUser).subscribe(
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
  //variable necesaria para ocultar/mostrar la contraseña
  hide = false;
}
