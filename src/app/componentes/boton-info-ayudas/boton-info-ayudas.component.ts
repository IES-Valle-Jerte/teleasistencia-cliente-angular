import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {info_ayudas} from "../../../environments/info_ayudas";

@Component({
  selector: 'app-boton-info-ayudas',
  templateUrl: './boton-info-ayudas.component.html',
  styleUrls: ['./boton-info-ayudas.component.scss']
})
export class BotonInfoAyudasComponent implements OnInit {
  private clave: any;
  public contenido: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.clave = this.route.snapshot.params['clave'];
    this.contenido=info_ayudas[this.clave];
  }

}
