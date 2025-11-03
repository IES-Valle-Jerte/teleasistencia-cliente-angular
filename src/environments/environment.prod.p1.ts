import { baseEnvironment } from './environment.base';

export const environment = {
  ...baseEnvironment,
  urlWebsocket: 'wss://api-rest-teleasistencia.iesvjp.es/ws/socket-server/',
  urlBase: 'https://api-rest-teleasistencia-p1.iesvjp.es/api-rest/',
  urlToken: 'https://api-rest-teleasistencia-p1.iesvjp.es/api/token/',
  //subdominio y version de la pagina
  subdominio: {
    nombre: 'P1',
    color:'green'
  },
};