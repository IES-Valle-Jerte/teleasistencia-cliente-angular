import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IRecursoComunitario} from '../../../../interfaces/i-recurso-comunitario';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import {CargaRecursoComunitarioService} from "../../../../services/recursos/carga-recurso-comunitario.service";
import {CargarClasificacionRecursosService} from "../../../../services/recursos/cargar-clasificacion-recursos.service";
import {IClasificacioRecurso} from "../../../../interfaces/i-clasificacio-recurso";
import { OrdenacionTablasV2Service } from 'src/app/servicios/ordenacion-tablas.v2.service';

@Component( {
  selector: 'app-lista-recursos-comunitarios',
  templateUrl: './lista-recursos-comunitarios.component.html',
  styleUrls: ['./lista-recursos-comunitarios.component.scss']
})
export class ListaRecursosComunitariosComponent implements OnInit {
  public recursos_comunitarios: IRecursoComunitario[] | any;
  public clasificacion: IClasificacioRecurso | any;
  public id;
  numPaginacion: number = 1;
  inputBusqueda: any = '';


  constructor(private route: ActivatedRoute,
              private cargarRecursos: CargaRecursoComunitarioService,private router: Router,
              private cargaClasificacion: CargarClasificacionRecursosService,
              private ordTabla: OrdenacionTablasV2Service,
              private cdr: ChangeDetectorRef) {
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


  ordenacionTabla(indice: number,campo1:string = "", campo2:string = "" , tipo: string ="string"){
    var recursos_comunitarios2 = this.ordTabla.ordenacionTabla(this.recursos_comunitarios,indice,campo1,campo2, tipo);
    this.recursos_comunitarios = [];
    this.cdr.detectChanges();
    this.recursos_comunitarios = recursos_comunitarios2;
    this.cdr.detectChanges();

  }
  // Esta función se ejecuta cada vez que cambia el valor del input de búsqueda
  onBusquedaChange() {
    // Cuando cambia el filtro, volvemos a la página 1
    this.numPaginacion = 1;
  }
}
