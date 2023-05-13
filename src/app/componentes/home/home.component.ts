import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CargaDesarrolladorTecnologiaService} from "../../servicios/carga-desarrollador-tecnologia.service";
import {IConvocatoria} from "../../interfaces/i-desarrollador-tecnologia";
import {Spinner} from "../../clases/spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public desarrolladores: IConvocatoria[]
  constructor(private titleService: Title, private cargaDesarrolladorTecnologia: CargaDesarrolladorTecnologiaService)  {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Inicio');
    // Spinner.mostrarSpiner();
    this.cargaDesarrolladorTecnologia.getDesarrolladorTecnologia().subscribe(
      e=>{
        this.desarrolladores = e;
        // setTimeout(() => {
        //   Spinner.ocultarSpinner();
        // }, 200);

      }
    )
  }
  mostrarDescripcion(event){
    let descripciones =event.target.parentElement.parentElement.parentElement.querySelector(".parrafoDescripcionTecnologia");
    descripciones.classList.toggle('d-none')
  }
}
