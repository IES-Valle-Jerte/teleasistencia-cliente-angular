import {Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrdenacionTablasV2Service {

  ordenacionTabla(objeto:  any, indice: number, campo1 = "", campo2 = "", type = 'string') {
    var col = document.querySelectorAll("th")[indice];
    var antiguaOrdenacion = col.getAttribute("data-ordenacion");
    var nuevaOrdenacion = antiguaOrdenacion === "asc" ? "desc" : "asc";
    
    objeto.sort((usuarioA, usuarioB) => {
      const valorA = this.obtenerValorPorRuta(usuarioA, campo1, type);
      const valorB = this.obtenerValorPorRuta(usuarioB, campo1, type);

      if (valorA === valorB) {
          if (campo2) {
              const valorA2 = this.obtenerValorPorRuta(usuarioA, campo2, type);
              const valorB2 = this.obtenerValorPorRuta(usuarioB, campo2, type);
              return nuevaOrdenacion === "asc" ? valorA2.localeCompare(valorB2) : valorB2.localeCompare(valorA2);
          }
          return 0;
      } else if (valorA === "" || valorA === null || valorA === undefined) {
          return 1;
      } else if (valorB === "" || valorB === null || valorB === undefined) {
          return -1;
      } else {
          if (type === 'number') {
              return nuevaOrdenacion === "asc" ? valorA - valorB : valorB - valorA;
          } else {
              return nuevaOrdenacion === "asc" ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
          }
      }
    });
    col.setAttribute("data-ordenacion",nuevaOrdenacion);
    return objeto;
  }

  obtenerValorPorRuta(objeto, ruta, type) {
    const partes = ruta.split('.');
    
    const valor = partes.reduce((acumulado, parte) => {
      return (acumulado && acumulado[parte]) ? acumulado[parte] : null;
    }, objeto);
    
    if (type === 'number' && valor !== null && !isNaN(valor)) {
        return Number(valor);
    } else {
        return valor ? valor.toUpperCase() : "";
    }
  }

}
