import {Component, OnInit} from '@angular/core';
import {IRecursoComunitario} from '../../../../interfaces/i-recurso-comunitario';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import {OrdenacionTablasService} from "../../../../servicios/ordenacion-tablas.service";
import {CargaRecursoComunitarioService} from "../../../../services/recursos/carga-recurso-comunitario.service";
import {CargarClasificacionRecursosService} from "../../../../services/recursos/cargar-clasificacion-recursos.service";
import {IClasificacioRecurso} from "../../../../interfaces/i-clasificacio-recurso";

@Component( {
  selector: 'app-lista-recursos-comunitarios',
  templateUrl: './lista-recursos-comunitarios.component.html',
  styleUrls: ['./lista-recursos-comunitarios.component.scss']
})
export class ListaRecursosComunitariosComponent implements OnInit {
  public recursos_comunitarios: IRecursoComunitario[] | any;
  public clasificacion: IClasificacioRecurso | any;
  public id;

  inputBusqueda: any = '';


  constructor(private route: ActivatedRoute, private ordTabla: OrdenacionTablasService, private cargarRecursos: CargaRecursoComunitarioService,private router: Router
  ,private cargaClasificacion: CargarClasificacionRecursosService) {
  }

  /*
  * Al cargar la página obtenemos la id de la url y así saber de que clasificación vamos a obtener los recursos*/
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.cargarDatos();

    this.route.params.subscribe(routeParams => {
      // Creamos un id Auxiliar que tenga el valor del id que obtenemos por url
      let idAux = this.route.snapshot.params['id'];

      if (idAux !== this.id){
        /* Hacemos que la id que hemos obtenido por parámetros
         * tenga el valor de la auxiliar
         */
        this.id = idAux;
        this.cargarDatos();
      }
    });
  }

  /*
  * Con este método cargamos los datos utilizando la id de la url*/
  cargarDatos(){

    this.cargarRecursos.getClasificacionRecursosEspecificos(this.id).subscribe(
      recurso_clasificado => {
        this.recursos_comunitarios = recurso_clasificado;
      },
      error => {
        console.log(error)
      }
    )

    this.cargaClasificacion.getClasificacionRecursoComunitario(this.id).subscribe(
      clasificacion =>{
        this.clasificacion = clasificacion;
      },error => {
        console.log(error)
      }
    )
  }

  // Este método es el utilizado para ordenar la tabla
  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }
}
