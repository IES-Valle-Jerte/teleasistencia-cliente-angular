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
        //return JSON.stringify(contenido).toLowerCase().includes(filtro.toLowerCase());
        
        const normalizedContenido = JSON.stringify(contenido).toLowerCase().normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");// Elimina los acentos del contenido
        const normalizedFiltro = filtro.toLowerCase().normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos del filtro
        return normalizedContenido.includes(normalizedFiltro);
      })
    }
  }

}
