// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //Numero de entradas permitidas en la paginacion.
  num_paginacion: 10,
  //Tiempo que tarda en irse el mensaje de exito
  timerToast: 4000,
  //Frase del Toast al Eliminar Con Exito
  fraseEliminar: 'Se ha eliminado correctamente',
  //Frase del Toast al Modificar Con Exito
  fraseModificar: 'Se ha modificado correctamente',
  //Frase del Toast al Crear Con Exito
  fraseCrear: 'Se ha creado Correctamente',
  //Frase del Toast al no poder crear mas contactos
  fraseContact: 'No se pueden crear más Contactos',
  //Frase al eliminar Recurso
  fraseEliminarRecurso: 'Se ha eliminado correctamente',
  //Frase de error al Eliminar del Toast
  fraseErrorEliminar: 'Se ha producido un error inesperado',
  //Frase de error al Modificar del Toast
  fraseErrorModificar: 'Se ha producido un error inesperado',
  //Frase de error al Crear del Toast
  fraseErrorCrear: 'Se ha producido un error inesperado',
  fraseRestaurarCopia: 'La copia seleccionada se ha restaurado.',
  //Frase Para cuando te asignas una alarma
  fraseAlarmaAceptada: 'Alarma asignada correctamente',
  //Frase para cuando ocurre algun error al asignar una alarma
  fraseErrorAsignarAlarma: 'Se ha Producido Un Error Inesperado',
  //Frase pera cuando la alarma se cierra de manera voluntaria
  fraseCerrarAlarmaVoluntario:'Alarma cerrada por pulsación voluntaria',


  //Modal
  //Color del Boton Aceptar del Modal
  colorAceptarModal: '#198754',
  //Color del Boton Cancelar del Modal
  colorCancelarModal: '#d33',
  //Frase de Confirmación para Eliminar
  fraseEliminarModal: '¿Estás seguro que deseas eliminarlo?',
  // Ruta que utilizaremos comun para todas las peticiones de api-rest
  urlWebsocket: 'ws://localhost:8000/ws/socket-server/',
  urlBase: 'http://localhost:8000/api-rest/',
  urlToken: 'http://localhost:8000/api/token/',

  //Control de roles
  admins: ['supervisor', 'administrador', 'profesor'],

//Expresiones regulares para validaciones:
  regex_name: /^[À-ÿA-Za-z][a-zA-ZÀ-ÿ- ]+$/, //nombres y apellidos
  regex_dni_nif:/^([XYZKLM]?\d{7,8})([A-Z])$/, //DNI o NIF
  regex_movil:/^[6|7]{1}[ ]*([0-9][ ]*){8}$/, //teléfonos moviles
  regex_fijo:/^[9]{1}[ ]*([0-9][ ]*){8}$/, // teléfonos fijos
  regex_telefono:/^[6|7|9]{1}[ ]*([0-9][ ]*){8}$/, //fijos + movil
  regex_cp:/^\d{5}$/, //codigo postal
  regex_exp:/^\d{4,}$/, // expediente paciente
  regex_ter:/^\d{4,}$/, //Terminales
  regex_modelo_ter:/^(?!^\s)[a-zA-Z0-9\s-]+$/,

  //subdominio y version de la pagina
  subdominio: {
    nombre: 'DEV',
    color: 'darkgreen'
  },
  version: '1.1',
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
