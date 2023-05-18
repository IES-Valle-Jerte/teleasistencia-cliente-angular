import { Component, OnInit } from '@angular/core';
import {RecursosComunitariosPerosnalesService} from "../../servicios/recursos-comunitarios-perosnales.service";
import {IRecursoComunitarioPersonal} from "../../interfaces/i-recurso-comunitario-persona";
import {CargaTipoRecursoComunitarioService} from "../../services/recursos/carga-tipo-recurso-comunitario.service";
import {ITipoRecursoComunitario} from "../../interfaces/i-tipo-recurso-comunitario";
import {CargaTipoCentroSanitarioService} from "../../servicios/carga-tipo-centro-sanitario.service";
import {ITipoCentroSanitario} from "../../interfaces/i-tipo-centro-sanitario";
import {OrdenacionTablasService} from "../../servicios/ordenacion-tablas.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-recursos-comunitarios-personales',
  templateUrl: './recursos-comunitarios-personales.component.html',
  styleUrls: ['./recursos-comunitarios-personales.component.scss']
})
export class RecursosComunitariosPersonalesComponent implements OnInit {
  public RCP:IRecursoComunitarioPersonal[]=[];
  public tipo_recurso:ITipoRecursoComunitario[]=[];
  public tipo_centro_sanitario:ITipoCentroSanitario[]=[];
  inputBusqueda: any = '';
  numPaginacion: number = 1;

  constructor(private RecursosComunitariosPersonalesService: RecursosComunitariosPerosnalesService,
              private TiposRecursoComunitarioService: CargaTipoRecursoComunitarioService,
              private TiporCentroSanitario:CargaTipoCentroSanitarioService,
              private ordTabla: OrdenacionTablasService,
              private titleService: Title) { }



  ngOnInit(): void {
    this.titleService.setTitle('Recursos Comunitarios - Personales');
    this.TiposRecursoComunitarioService.getTiposRecursosComunitarios().subscribe(resp=>{
      this.tipo_recurso=resp
    })
    this.TiporCentroSanitario.getTiposCentrosSanitarios().subscribe(resp=>{
      this.tipo_centro_sanitario=resp
    })
    this.RecursosComunitariosPersonalesService.getRecursoComunitarioPersonal().subscribe(resp=>{
      this.RCP=resp
    })

  }


  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }

}
