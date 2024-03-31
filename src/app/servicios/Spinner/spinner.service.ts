import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Spinner {

  constructor() {
  }
  mostrarSpiner(){
    let spinner = document.querySelector(".spinner");
    // @ts-ignore
    spinner.classList.add("d-block");
    // @ts-ignore
    spinner.classList.remove("d-none");
  }
  ocultarSpinner(){

    let spinner = document.querySelector(".spinner");
    // @ts-ignore
    spinner.classList.add("d-none");
    // @ts-ignore
    spinner.classList.remove("d-block");

  }
  
}



