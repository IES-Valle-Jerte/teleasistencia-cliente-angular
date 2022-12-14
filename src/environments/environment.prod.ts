export const environment = {
  production: true,

  //Numero de entradas permitidas en la paginacion.
  num_paginacion: 10,
  //Tiempo que tarda en irse el mensaje de exito
  timerToast : 4000,
  //Frase del Toast al Eliminar Con Exito
  fraseEliminar: 'Se ha eliminado correctamente',
  //Frase del Toast al Modificar Con Exito
  fraseModificar: 'Se ha modificado correctamente',
  //Frase del Toast al Crear Con Exito
  fraseCrear: 'Se ha creado Correctamente',
  //Frase de error al Eliminar del Toast
  fraseErrorEliminar: 'Se ha producido un error inesperado',
  //Frase de error al Modificar del Toast
  fraseErrorModificar: 'Se ha producido un error inesperado',
  //Frase de error al Crear del Toast
  fraseErrorCrear: 'Se ha producido un error inesperado',
  fraseRestaurarCopia: 'La copia seleccionada se ha restaurado.',
  //Frase Para cuando te asignas una alarma
  fraseAlarmaAceptada: 'Alarma asignada correptamente',
  //Frase para cuando ocurre algun error al asignar una alarma
  fraseErrorAsignarAlarma: 'Se ha Producido Un Error Inesperado',

  //Modal
  //Color del Boton Aceptar del Modal
  colorAceptarModal: '#198754',
  //Color del Boton Cancelar del Modal
  colorCancelarModal: '#d33',
  //Frase de Confirmación para Eliminar
  fraseEliminarModal: '¿Desea Eliminar este Elemento?',
  // Ruta que utilizaremos comun para todas las peticiones de api-rest
  urlWebsocket: 'ws://localhost:8000/ws/socket-server/',
  urlBase: 'http://localhost:8000/api-rest/',
  urlToken: 'http://localhost:8000/api/token/',
};
