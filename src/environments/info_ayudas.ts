export const info_ayudas = {
  listado_alarmas: {
    segundo_titulo:'<h2>Manual de Ayuda en la pantalla de alarmas</h2>',
    contenido:
      '<h4>TÍTULO-FECHA ACTUAL</h4>' +
      '<p>La fecha es la fecha actual y cambia d&iacute;a tras d&iacute;a.</p>\n' +
      '<h4>CAMPO DE BUSQUEDA</h4><p>El campo de b&uacute;squeda sirve para filtrar las alarmas a trav&eacute;s del texto que introducimos en este campo.</p>\n' +
      '<h4>B&Uacute;SQUEDA POR FECHA</h4><p>En este campo se introduce la fecha que desee, y se te mostrara las alarmas que se hayan creado ese d&iacute;a, esto facilita la b&uacute;squeda de alarmas.</p>\n' +
      '<h4>ESTADO</h4><p>En esta columna se muestra el estado de la alarma puede ser abierta, que significa que todav&iacute;a no esta resuelta la incidencia.<br />Pero tambi&eacute;n el estado puede ser resuelta, lo que significa que la incidencia ya esta solucionada.</p>\n' +

      '<h4>HORA REGISTRO</h4>\n' +
      '<p >En esta columna se muestra la hora que la alarma queda registrada y asi quedan mejor registradas.</p>\n' +
      '<p >Adem&aacute;s mediante el buscador es mucho m&aacute;s facil la busqueda de las alarmas.</p>\n' +
      '<h4>OBSERVACIONES</h4>\n' +
      '<p >&nbsp;En la columna de las observaciones de las alarmas, se notifican todos los datos con relevancia que pueden ser de ayuda, para ayudar al paciente una vez que se ha resuelto la alarma.</p>\n' +
      '<h4>RESUMEN</h4>\n' +
      '<p >En la columna de resumen de las alarmas, se&nbsp; notifican una informaci&oacute;n general o una informaci&oacute;n resumida de como se ha resuelto la alarma.</p>\n' +

      '<h4>TIPO ALARMA</h4>\n' +
      '<p >En la columna de tipo de alarmas, en esta columna se almacena el motivo o la especificaci&oacute;n de porque se ha creado la alarma y queda almacenada.</p>\n' +

      '<h4>PACIENTE UCR</h4>\n' +
      '<p >En la columna de paciente ucr, se almacena el nombre del paciente sobre el que se ha creado la alarma, pero esta columna tambi&eacute;n puede estar vacia, ya que la alarma no tiene porque ser solo de pacientes, puede ser por errores de perifericos, etc.</p>\n' +

      '<h4>N&Uacute;MERO TERMINAL</h4>\n' +
      '<p>El numero identificativo del terminal que se ha utilizado para crear la alarma </p>' +
      '<h4>TELEOPERADOR</h4>\n' +
      '<p >En la columna de teleoperador, se almacena el nombre del teleoperador que ha resuelto la alarma.</p><ul>\n' +
      '<br><br><li>\n' +
      '<h4>COLOR DE FONDO-AMARILLO</h4>\n' +
      '<p>Si la alarma tiene el fondo de color amarillo significa que la alarma esta resuelta, por lo que los botones que muestran son los siguientes:</p>\n' +
      '<ul>\n' +
      '<li>\n' +
      '<h5>BOT&Oacute;N AZUL-VER ALARMA</h5>\n' +
      '<p>El bot&oacute;n azul sirve para cargar una pagina y ver todos los datos que almacena la alarma con detalle.</p>\n' +
      '</li>\n' +
      '<li>\n' +
      '<h5>BOT&Oacute;N AMARILLO-MODIFICAR TELEOPERADOR</h5>\n' +
      '<p>El boton amarillo sirve para cargar una pantalla que sirve para cambiar el teleoperador que ha atendido la alarma.</p>\n' +
      '</li>\n' +
      '  <li>\n' +
      '  <h5>BOTÓN ROJO-ELIMINAR ALARMA</h5>\n' +
      '    <p>\n' +
      '      El botón rojo sirve para cargar una pantalla emergente para poder eliminar la alarma que se ha seleccionado.\n' +
      '    </p>\n' +
      '  </li>\n' +
      '</ul>\n' +
      '</li>\n' +
      '</ul><ul>\n' +
      '<li>\n' +
      '<h4>COLOR DE FONDO-ROSITA</h4>\n' +
      '<p>Si la alarma tiene el fondo de color rosita significa que la alarma no esta resuelta, por lo que los botones que muestran son los siguientes:</p>\n' +
      '<ul>\n' +
      '<li>\n' +
      '<h5>BOT&Oacute;N VERDE-RESOLVER ALARMA</h5>\n' +
      '<p>El botón verde sirve para resolver las alarmas, cuando haces click sobre el botón carga una pagina para completar todos los datos necesarios para resolver la alarma</p>\n' +
      '</li>\n' +
      '<li>\n' +
      '<h5>BOT&Oacute;N AMARILLO-MODIFICAR TELEOPERADOR</h5>\n' +
      '<p>El boton amarillo sirve para cargar una pantalla que sirve para cambiar el teleoperador que ha atendido la alarma.</p>\n' +
      '</li>\n' +
      '<li>\n' +
      '<h5>BOT&Oacute;N ROJO-ELIMINAR ALARMA</h5>\n' +
      '<p>El bot&oacute;n rojo sirve para cargar una pantalla emergente para poder eliminar la alarma que se ha seleccionado.</p>\n' +
      '</li>\n' +
      '</ul>\n' +
      '</li>\n' +
      '</ul>'

  },
  crear_alarmas:{
    segundo_titulo:'<h2>Manual de Ayuda en la pantalla de creación de alarmas</h2>',
    contenido:'<ul>\n' +
      '  <li>\n' +
      '    <h4>\n' +
      '    \tTIPO DE ALARMAS\n' +
      '    </h4>\n' +
      '    <ul>\n' +
      '      <li>En este campo puedes selecionar una de todos los tipos de alarmas que tenemos registradas, pero también tenemos distintas funciones despues de la eleccion del tipo de alarma.\n' +
      '        <ul>\n' +
      '        <li>Botón Verde<p>\n' +
      '            Sirve para crear nuevos tipos de alarmas\n' +
      '          </p></li>\n' +
      '         <li>Botón Amarillo<p>\n' +
      '            Sirve para modificar los datos del tipo de alarma en el caso de que este una alarma seleccionada.\n' +
      '          </p></li> \n' +
      '          <li>Botón Rojo<p>\n' +
      '            Sirve para eleminar el tipo de alarma que tengamos seleccionada en el campo.\n' +
      '          </p></li>\n' +
      '        </ul>\n' +
      '      </li>\n' +
      '    </ul>\n' +
      '  </li>\n' +
      '</ul><ul>\n' +
      '  <li>\n' +
      '    <h4>\n' +
      '    \tALARMA SEGÚN:\n' +
      '    </h4>\n' +
      '    <ul>\n' +
      '      <li>En este campo tenemos dos opciones que la alarma sea creada por un paciente, o por una terminal y dependiendo de esa opcion cambiara el ultimo campo del formulario para crear una alarma.\n' +
      '        \n' +
      '      </li>\n' +
      '    </ul>\n' +
      '  </li>\n' +
      '</ul><ul>\n' +
      '  <li>\n' +
      '    <h4>\n' +
      '    \tELECCION DE TERMINAL O PACIENTE:\n' +
      '    </h4>\n' +
      '    <ul>\n' +
      '      <li>En este campo se selecciona el teminal o el/la paciente que va a generar la alarma, la eleccion de si es un terminal o un/una paciente se determina en el campo anterior como he explicado anteriormente         \n' +
      '      </li>\n' +
      '    </ul>\n' +
      '  </li>\n' +
      '</ul>'
  }
}
