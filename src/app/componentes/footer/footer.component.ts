import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public nombreUser:string=localStorage.getItem('username')
  public apellidoUser:string=localStorage.getItem('userlastname')

  version=environment.version;

  constructor() { }

  ngOnInit(): void {
  }

}
