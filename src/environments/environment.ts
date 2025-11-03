
import { baseEnvironment } from './environment.base';

export const environment = {
  ...baseEnvironment,
  urlWebsocket: 'ws://localhost:8000/ws/socket-server/',
  urlBase: 'http://localhost:8000/api-rest/',
  urlToken: 'http://localhost:8000/api/token/',
  //subdominio y version de la pagina
  subdominio: {
    nombre: 'DEV',
    color: 'darkgreen'
  },
};