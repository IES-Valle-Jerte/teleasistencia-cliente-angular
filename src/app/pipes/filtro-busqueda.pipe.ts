import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroBusqueda'
})
export class FiltroBusquedaPipe implements PipeTransform {

  /*Simplemente, vamos comprobando si el valor introducido esta presente en el contenido,
  pasandolo a minusculas para que no sea case sensitive */
  transform(valorIntroducido: any[], filtro?: any): any {
    if(valorIntroducido !== undefined){
        return valorIntroducido.filter(function (contenido){
        return JSON.stringify(contenido).toLowerCase().includes(filtro.toLowerCase());
      })
    }
  }

}
