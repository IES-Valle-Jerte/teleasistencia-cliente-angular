import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListaUsersComponent} from './componentes/user/lista-users/lista-users.component';
import {ItemUserComponent} from './componentes/user/item-user/item-user.component';
import {ModificarUserComponent} from './componentes/user/modificar-user/modificar-user.component';
import {CrearUserComponent} from './componentes/user/crear-user/crear-user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './componentes/home/home.component';
import {CargaUserService} from './servicios/carga-user.service';
import {ItemClasificacionAlarmaComponent} from './componentes/clasificacion-alarma/item-clasificacion-alarma/item-clasificacion-alarma.component';
import {ModificarClasificacionAlarmaComponent} from './componentes/clasificacion-alarma/modificar-clasificacion-alarma/modificar-clasificacion-alarma.component';
import {CrearClasificacionAlarmaComponent} from './componentes/clasificacion-alarma/crear-clasificacion-alarma/crear-clasificacion-alarma.component';
import {ListaClasificacionesAlarmasComponent} from './componentes/clasificacion-alarma/lista-clasificaciones-alarmas/lista-clasificaciones-alarmas.component';
import {ListaTiposCentrosSanitariosComponent} from './componentes/tipo-centro-sanitario/lista-tipos-centros-sanitarios/lista-tipos-centros-sanitarios.component';
import {ItemTipoCentroSanitarioComponent} from './componentes/tipo-centro-sanitario/item-tipo-centro-sanitario/item-tipo-centro-sanitario.component';
import {ModificarTipoCentroSanitarioComponent} from './componentes/tipo-centro-sanitario/modificar-tipo-centro-sanitario/modificar-tipo-centro-sanitario.component';
import {CrearTipoCentroSanitarioComponent} from './componentes/tipo-centro-sanitario/crear-tipo-centro-sanitario/crear-tipo-centro-sanitario.component';
import {CargaClasificacionAlarmaService} from './servicios/carga-clasificacion-alarma.service';
import {CargaTipoCentroSanitarioService} from './servicios/carga-tipo-centro-sanitario.service';
import {ListaTiposRecursosComunitariosComponent} from './components/recursos/tipo-recurso-comunitario/lista-tipos-recursos-comunitarios/lista-tipos-recursos-comunitarios.component';
import {ItemTipoRecursoComunitarioComponent} from './components/recursos/tipo-recurso-comunitario/item-tipo-recurso-comunitario/item-tipo-recurso-comunitario.component';
import {ModificarTipoRecursoComunitarioComponent} from './components/recursos/tipo-recurso-comunitario/modificar-tipo-recurso-comunitario/modificar-tipo-recurso-comunitario.component';
import {CrearTipoRecursoComunitarioComponent} from './components/recursos/tipo-recurso-comunitario/crear-tipo-recurso-comunitario/crear-tipo-recurso-comunitario.component';
import {CargaTipoRecursoComunitarioService} from './services/recursos/carga-tipo-recurso-comunitario.service';
import {ListaTiposModalidadesPacientesComponent} from './componentes/tipo-modalidad-paciente/lista-tipos-modalidades-pacientes/lista-tipos-modalidades-pacientes.component';
import {ItemTipoModalidadPacienteComponent} from './componentes/tipo-modalidad-paciente/item-tipo-modalidad-paciente/item-tipo-modalidad-paciente.component';
import {ModificarTipoModalidadPacienteComponent} from './componentes/tipo-modalidad-paciente/modificar-tipo-modalidad-paciente/modificar-tipo-modalidad-paciente.component';
import {CrearTipoModalidadPacienteComponent} from './componentes/tipo-modalidad-paciente/crear-tipo-modalidad-paciente/crear-tipo-modalidad-paciente.component';
import {CargaTipoModalidadPacienteService} from './servicios/carga-tipo-modalidad-paciente.service';
import {ListaTiposAlarmasComponent} from './componentes/tipo-alarma/lista-tipos-alarmas/lista-tipos-alarmas.component';
import {ItemTipoAlarmaComponent} from './componentes/tipo-alarma/item-tipo-alarma/item-tipo-alarma.component';
import {ModificarTipoAlarmaComponent} from './componentes/tipo-alarma/modificar-tipo-alarma/modificar-tipo-alarma.component';
import {CrearTipoAlarmaComponent} from './componentes/tipo-alarma/crear-tipo-alarma/crear-tipo-alarma.component';
import {CargaTipoAlarmaService} from './servicios/carga-tipo-alarma.service';
import {ListaCentrosSanitariosComponent} from './componentes/centro-sanitario/lista-centros-sanitarios/lista-centros-sanitarios.component';
import {ItemCentroSanitarioComponent} from './componentes/centro-sanitario/item-centro-sanitario/item-centro-sanitario.component';
import {ModificarCentroSanitarioComponent} from './componentes/centro-sanitario/modificar-centro-sanitario/modificar-centro-sanitario.component';
import {CrearCentroSanitarioComponent} from './componentes/centro-sanitario/crear-centro-sanitario/crear-centro-sanitario.component';
import {ListaRecursosComunitariosComponent} from './components/recursos/recurso-comunitario/lista-recursos-comunitarios/lista-recursos-comunitarios.component';
import {ItemRecursoComunitarioComponent} from './components/recursos/recurso-comunitario/item-recurso-comunitario/item-recurso-comunitario.component';
import {ModificarRecursoComunitarioComponent} from './components/recursos/recurso-comunitario/modificar-recurso-comunitario/modificar-recurso-comunitario.component';
import {CrearRecursoComunitarioComponent} from './components/recursos/recurso-comunitario/crear-recurso-comunitario/crear-recurso-comunitario.component';
import {ListaPersonasComponent} from './componentes/persona/lista-personas/lista-personas.component';
import {ItemPersonaComponent} from './componentes/persona/item-persona/item-persona.component';
import {ModificarPersonaComponent} from './componentes/persona/modificar-persona/modificar-persona.component';
import {CrearPersonaComponent} from './componentes/persona/crear-persona/crear-persona.component';
import {ListaDireccionesComponent} from './componentes/direccion/lista-direcciones/lista-direcciones.component';
import {ItemDireccionComponent} from './componentes/direccion/item-direccion/item-direccion.component';
import {ModificarDireccionComponent} from './componentes/direccion/modificar-direccion/modificar-direccion.component';
import {CrearDireccionComponent} from './componentes/direccion/crear-direccion/crear-direccion.component';
import {CargaDireccionService} from './servicios/carga-direccion.service';
import {CargaCentroSanitarioService} from './servicios/carga-centro-sanitario.service';
import {CargaPersonaService} from './servicios/carga-persona.service';
import {CargaRecursoComunitarioService} from './services/recursos/carga-recurso-comunitario.service';
import {PantallaLoginComponent} from './componentes/pantalla-login/pantalla-login.component';
import {HeaderComponent} from './componentes/header/header.component';
import {FooterComponent} from './componentes/footer/footer.component';
import {BotonesLoginComponent} from './componentes/botones-login/botones-login.component';
import { AgendaComponent } from './componentes/agenda/lista-agenda/agenda.component';
import {ModificarHistoricoAgendaComponent} from "./componentes/historico-agenda/modificar-historico-agenda/modificar-historico-agenda.component";
import {ModificarAgendaComponent} from "./componentes/agenda/modificar-agenda/modificar-agenda.component";
import { CommonModule } from '@angular/common';
import { TipoAgendaComponent } from './componentes/tipo-agenda/lista-tipo-agenda/tipo-agenda.component';
import { ListaRelacionTerminalRecursosComunitariosComponent } from './componentes/relacion-terminal-recursos-comunitarios/lista-relacion-terminal-recursos-comunitarios/lista-relacion-terminal-recursos-comunitarios.component';
import { ItemRelacionTerminalRecursosComunitariosComponent } from './componentes/relacion-terminal-recursos-comunitarios/item-relacion-terminal-recursos-comunitarios/item-relacion-terminal-recursos-comunitarios.component';
import { CrearRelacionTerminalRecursosComunitariosComponent } from './componentes/relacion-terminal-recursos-comunitarios/crear-relacion-terminal-recursos-comunitarios/crear-relacion-terminal-recursos-comunitarios.component';
import { ModificarRelacionTerminalRecursosComunitariosComponent } from './componentes/relacion-terminal-recursos-comunitarios/modificar-relacion-terminal-recursos-comunitarios/modificar-relacion-terminal-recursos-comunitarios.component';
import {CargaRelacionTerminalRecursosComunitariosService} from "./servicios/relacion-terminal-recurso-comunitario/carga-relacion-terminal-recursos-comunitarios.service";
import {NgxPaginationModule} from 'ngx-pagination';
import {OrdenacionTablasService} from "./servicios/ordenacion-tablas.service";
import { FiltroBusquedaPipe } from './pipes/filtro-busqueda.pipe';
import { ListaTiposViviendaComponent } from './componentes/tipo-vivienda/lista-tipos-vivienda/lista-tipos-vivienda.component';
import { ListaTiposSituacionComponent } from './componentes/tipo-situacion/lista-tipos-situacion/lista-tipos-situacion.component';
import { ItemTipoViviendaComponent } from './componentes/tipo-vivienda/item-tipo-vivienda/item-tipo-vivienda.component';
import { CrearViviendaComponent } from './componentes/vivienda/crear-tipo-vivienda/crear-vivienda.component';
import { ModificarTipoViviendaComponent } from './componentes/tipo-vivienda/modificar-tipo-vivienda/modificar-tipo-vivienda.component';
import {CargaViviendaService} from "./servicios/carga-vivienda.service";
import { ItemTipoSituacionComponent } from './componentes/tipo-situacion/item-tipo-situacion/item-tipo-situacion.component';
import { CrearTipoSituacionComponent } from './componentes/tipo-situacion/crear-tipo-situacion/crear-tipo-situacion.component';
import { ModificarTipoSituacionComponent } from './componentes/tipo-situacion/modificar-tipo-situacion/modificar-tipo-situacion.component';
import { BorrarTipoViviendaComponent } from './componentes/tipo-vivienda/borrar-tipo-vivienda/borrar-tipo-vivienda.component';
import { BorrarTipoSituacionComponent } from './componentes/tipo-situacion/borrar-tipo-situacion/borrar-tipo-situacion.component';
import {InterceptorService} from "./interceptors/interceptor.service";
import { ItemCopiaSeguridadComponent } from './componentes/copia-seguridad/item-copia-seguridad/item-copia-seguridad.component';
import { ListaCopiaSeguridadComponent } from './componentes/copia-seguridad/lista-copia-seguridad/lista-copia-seguridad.component';
import { CrearCopiaSeguridadComponent } from './componentes/copia-seguridad/crear-copia-seguridad/crear-copia-seguridad.component';
import { RestaurarCopiaSeguridadComponent } from './componentes/copia-seguridad/restaurar-copia-seguridad/restaurar-copia-seguridad.component';
import { NuevoTipoAgendaComponent } from './componentes/tipo-agenda/nuevo-tipo-agenda/nuevo-tipo-agenda.component';
import { ItemTipoAgendaComponent } from './componentes/tipo-agenda/item-tipo-agenda/item-tipo-agenda.component';
import { DetallesTipoAgendaComponent } from './componentes/tipo-agenda/detalles-tipo-agenda/detalles-tipo-agenda.component';
import { NuevoAgendaComponent } from './componentes/agenda/nuevo-agenda/nuevo-agenda.component';
import { HistoricoTipoSituacionComponent } from './componentes/historico-tipo-situacion/lista-historico-tipo-situacion/historico-tipo-situacion.component';
import { CrearHistoricoTipoSituacionComponent } from './componentes/historico-tipo-situacion/crear-historico-tipo-situacion/crear-historico-tipo-situacion.component';
import { ModificarHistoricoTipoSituacionComponent } from './componentes/historico-tipo-situacion/modificar-historico-tipo-situacion/modificar-historico-tipo-situacion.component';
import { ItemHistoricoTipoSituacionComponent } from './componentes/historico-tipo-situacion/item-historico-tipo-situacion/item-historico-tipo-situacion.component';
import {CargaHistoricoTipoSituacionService} from "./servicios/carga-historico-tipo-situacion.service";
import {CargaTipoAgendaService} from "./servicios/carga-tipo-agenda.service";
import {CargaAgendaService} from "./servicios/carga-agenda.service";
import { ItemAgendaComponent } from './componentes/agenda/item-agenda/item-agenda.component';
import { ItemHistoricoAgendaComponent } from './componentes/historico-agenda/item-historico-agenda/item-historico-agenda.component';
import { ListaHistoricoAgendaComponent } from './componentes/historico-agenda/lista-historico-agenda/lista-historico-agenda.component';
import {NuevoHistoricoAgendaComponent} from "./componentes/historico-agenda/nuevo-historico-agenda/nuevo-historico-agenda.component";
import { ListaAlarmasComponent } from './componentes/alarma/lista-alarmas/lista-alarmas.component';
import { ModificarCerrarAlarmaComponent } from './componentes/alarma/modificar-cerrar-alarma/modificar-cerrar-alarma.component';
import { ItemAlarmaComponent } from './componentes/alarma/item-alarma/item-alarma.component';
import { ListaTerminalComponent } from './componentes/terminal/lista-terminal/lista-terminal.component';
import { ItemTerminalComponent } from './componentes/terminal/item-terminal/item-terminal.component';
import { CrearTerminalComponent } from './componentes/terminal/crear-terminal/crear-terminal.component';
import { ModificarTerminalComponent } from './componentes/terminal/modificar-terminal/modificar-terminal.component';
import {CargaTerminalesService} from "./servicios/terminal/carga-terminales.service";
import {CargaAlarmaService} from "./servicios/alarmas/carga-alarma.service";
import {CargaPacienteService} from "./servicios/paciente/carga-paciente.service";
import { CrearPacienteComponent } from './componentes/paciente/crear-paciente/crear-paciente.component';
import { ItemPacienteComponent } from './componentes/paciente/item-paciente/item-paciente.component';
import { ListaPacienteComponent } from './componentes/paciente/lista-paciente/lista-paciente.component';
import { ModificarPacienteComponent } from './componentes/paciente/modificar-paciente/modificar-paciente.component';
import { CrearCentroSanitarioAlarmaComponent } from './componentes/centro-sanitario-alarma/crear-centro-sanitario-alarma/crear-centro-sanitario-alarma.component';
import { ModificarCentroSanitarioAlarmaComponent } from './componentes/centro-sanitario-alarma/modificar-centro-sanitario-alarma/modificar-centro-sanitario-alarma.component';
import { ListaCentroSanitarioAlarmaComponent } from './componentes/centro-sanitario-alarma/lista-centro-sanitario-alarma/lista-centro-sanitario-alarma.component';
import { ItemCentroSanitarioAlarmaComponent } from './componentes/centro-sanitario-alarma/item-centro-sanitario-alarma/item-centro-sanitario-alarma.component';
import { ItemRecursoComunitarioAlarmaComponent } from './componentes/recurso-comunitario-alarma/item-recurso-comunitario-alarma/item-recurso-comunitario-alarma.component';
import { ListaRecursoComunitarioAlarmaComponent } from './componentes/recurso-comunitario-alarma/lista-recurso-comunitario-alarma/lista-recurso-comunitario-alarma.component';
import { CrearRecursoComunitarioAlarmaComponent } from './componentes/recurso-comunitario-alarma/crear-recurso-comunitario-alarma/crear-recurso-comunitario-alarma.component';
import { ModificarRecursoComunitarioAlarmaComponent } from './componentes/recurso-comunitario-alarma/modificar-recurso-comunitario-alarma/modificar-recurso-comunitario-alarma.component';
import { ModificarPersonaContactoAlarmaComponent } from './componentes/persona-contacto-alarma/modificar-persona-contacto-alarma/modificar-persona-contacto-alarma.component';
import { CrearPersonaContactoAlarmaComponent } from './componentes/persona-contacto-alarma/crear-persona-contacto-alarma/crear-persona-contacto-alarma.component';
import { ListaPersonaContactoAlarmaComponent } from './componentes/persona-contacto-alarma/lista-persona-contacto-alarma/lista-persona-contacto-alarma.component';
import { ItemPersonaContactoAlarmaComponent } from './componentes/persona-contacto-alarma/item-persona-contacto-alarma/item-persona-contacto-alarma.component';
import { ItemDispositivosAuxiliaresTerminalComponent } from './componentes/dispositivos-auxiliares-terminal/item-dispositivos-auxiliares-terminal/item-dispositivos-auxiliares-terminal.component';
import { ListaDispositivosAuxiliaresTerminalComponent } from './componentes/dispositivos-auxiliares-terminal/lista-dispositivos-auxiliares-terminal/lista-dispositivos-auxiliares-terminal.component';
import { CrearDispositivosAuxiliaresTerminalComponent } from './componentes/dispositivos-auxiliares-terminal/crear-dispositivos-auxiliares-terminal/crear-dispositivos-auxiliares-terminal.component';
import { ModificarDispositivosAuxiliaresTerminalComponent } from './componentes/dispositivos-auxiliares-terminal/modificar-dispositivos-auxiliares-terminal/modificar-dispositivos-auxiliares-terminal.component';
import { ModificarRelacionUsuarioCentroComponent } from './componentes/relacion-usuario-centro/modificar-relacion-usuario-centro/modificar-relacion-usuario-centro.component';
import { CrearRelacionUsuarioCentroComponent } from './componentes/relacion-usuario-centro/crear-relacion-usuario-centro/crear-relacion-usuario-centro.component';
import { ItemRelacionUsuarioCentroComponent } from './componentes/relacion-usuario-centro/item-relacion-usuario-centro/item-relacion-usuario-centro.component';
import { ListaRelacionUsuarioCentroComponent } from './componentes/relacion-usuario-centro/lista-relacion-usuario-centro/lista-relacion-usuario-centro.component';
import { ModificarTeleoperadorAlarmaComponent } from './componentes/alarma/modificar-teleoperador-alarma/modificar-teleoperador-alarma.component';
import { RecursosComunitariosPersonalesComponent } from './componentes/recursos-comunitarios-personales/recursos-comunitarios-personales.component';
import { GruposComponent } from './componentes/grupos/grupos.component';
import { CrearUserServicioComponent } from './componentes/usuarios-del-servicio/crear-user-servicio/crear-user-servicio.component';
import { ConsultarUsersServicioComponent } from './componentes/usuarios-del-servicio/consultar-users-servicio/consultar-users-servicio.component';
import { VerRecursoComponent } from './components/recursos/recurso-comunitario/ver-recurso/ver-recurso.component';
import { CrearAlarmaComponent} from "./componentes/alarma/crear-alarma/crear-alarma.component";
import { NgSelectModule} from "@ng-select/ng-select";
import { CrearPersonaContactoComponent } from './componentes/personas-contacto/crear-persona-contacto/crear-persona-contacto.component';
import { CrearDatosSanitariosComponent } from './componentes/datos-sanitario/crear-datos-sanitarios/crear-datos-sanitarios.component';
import { MostrarCrearComponent } from './componentes/personas-contacto/mostrar-crear/mostrar-crear.component';


import { BotonInfoAyudasComponent } from './componentes/boton-info-ayudas/boton-info-ayudas.component';



import { NuevoTipoViviendaComponent } from './componentes/tipo-vivienda/nuevo-tipo-vivienda/nuevo-tipo-vivienda.component';
import { DispositivosComponent } from './componentes/dispositivos/dispositivos.component';
import { MostrarClasificacionAlarmaComponent } from './componentes/mostrar-clasificacion-alarma/mostrar-clasificacion-alarma.component';
import { ModificarUserServicioComponent } from './componentes/usuarios-del-servicio/modificar-user-servicio/modificar-user-servicio.component';
import { EditarDatosSanitarioComponent } from './componentes/datos-sanitario/editar-datos-sanitario/editar-datos-sanitario.component';
import { EditarTipoViviendaComponent } from './componentes/vivienda/editar-tipo-vivienda/editar-tipo-vivienda.component';
import { EditarContactoComponent } from './componentes/personas-contacto/editar-contacto/editar-contacto.component';
import { MostrarEditarContactoComponent } from './componentes/personas-contacto/mostrar-editar-contacto/mostrar-editar-contacto.component';
import { CrearEditarContactoComponent } from './componentes/personas-contacto/crear-editar-contacto/crear-editar-contacto.component';
import { DispositivosEditarComponent } from './componentes/dispositivos-editar/dispositivos-editar.component';

import { ModificarPasswordComponent } from './componentes/user/modificar-password/modificar-password.component';
import { ModificarImagenUsuarioComponent } from './componentes/botones-modificar/modificar-imagen-usuario/modificar-imagen-usuario.component';
import { ModificarPasswordUsuarioComponent } from './componentes/botones-modificar/modificar-password-usuario/modificar-password-usuario.component';
import { TiposRecursosComunitariosComponent } from './componentes/alarma/tipos-recursos-comunitarios/tipos-recursos-comunitarios.component';

import { UserAgendasAlarmasResueltasComponent } from './componentes/seguimiento_teleoperador/lista-seguimiento-teleoperador/user-agendas-alarmas-resueltas.component';
import { ItemTeleoperadorComponent } from './componentes/seguimiento_teleoperador/item-teleoperador/item-teleoperador.component';
import { ListaAlarmasResueltasComponent } from './componentes/seguimiento_teleoperador/lista-alarmas-resueltas/lista-alarmas-resueltas.component';
import { ItemAgendasResueltasComponent } from './componentes/seguimiento_teleoperador/item-agendas-resueltas/item-agendas-resueltas.component';



import { EditMostrarClasificacionAlarmaComponent } from './componentes/edit-mostrar-clasificacion-alarma/edit-mostrar-clasificacion-alarma.component';
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import { ItemAlarmasResueltasComponent } from './componentes/seguimiento_teleoperador/item-alarmas-resueltas/item-alarmas-resueltas.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsersComponent,
    ItemUserComponent,
    ModificarUserComponent,
    CrearUserComponent,
    HomeComponent,
    ItemClasificacionAlarmaComponent,
    ModificarClasificacionAlarmaComponent,
    CrearClasificacionAlarmaComponent,
    ListaClasificacionesAlarmasComponent,
    ListaTiposCentrosSanitariosComponent,
    ItemTipoCentroSanitarioComponent,
    ModificarTipoCentroSanitarioComponent,
    CrearTipoCentroSanitarioComponent,
    ListaTiposRecursosComunitariosComponent,
    ItemTipoRecursoComunitarioComponent,
    ModificarTipoRecursoComunitarioComponent,
    CrearTipoRecursoComunitarioComponent,
    ListaTiposModalidadesPacientesComponent,
    ItemTipoModalidadPacienteComponent,
    ModificarTipoModalidadPacienteComponent,
    CrearTipoModalidadPacienteComponent,
    ListaTiposAlarmasComponent,
    ItemTipoAlarmaComponent,
    ModificarTipoAlarmaComponent,
    CrearTipoAlarmaComponent,
    ListaCentrosSanitariosComponent,
    ItemCentroSanitarioComponent,
    ModificarCentroSanitarioComponent,
    CrearCentroSanitarioComponent,
    ListaRecursosComunitariosComponent,
    ItemRecursoComunitarioComponent,
    ModificarRecursoComunitarioComponent,
    CrearRecursoComunitarioComponent,
    ListaPersonasComponent,
    ItemPersonaComponent,
    ModificarPersonaComponent,
    CrearPersonaComponent,
    ListaDireccionesComponent,
    ItemDireccionComponent,
    ModificarDireccionComponent,
    CrearDireccionComponent,
    PantallaLoginComponent,
    HeaderComponent,
    FooterComponent,
    BotonesLoginComponent,
    AgendaComponent,
    TipoAgendaComponent,
    NuevoTipoAgendaComponent,
    ItemTipoAgendaComponent,
    DetallesTipoAgendaComponent,
    ListaRelacionTerminalRecursosComunitariosComponent,
    ItemRelacionTerminalRecursosComunitariosComponent,
    CrearRelacionTerminalRecursosComunitariosComponent,
    ModificarRelacionTerminalRecursosComunitariosComponent,
    CrearRelacionTerminalRecursosComunitariosComponent,
    RecursosComunitariosPersonalesComponent,
    FiltroBusquedaPipe,
    ListaTiposViviendaComponent,
    ListaTiposSituacionComponent,
    ItemTipoViviendaComponent,
    CrearViviendaComponent,
    ModificarTipoViviendaComponent,
    ItemTipoSituacionComponent,
    CrearTipoSituacionComponent,
    ModificarTipoSituacionComponent,
    BorrarTipoViviendaComponent,
    BorrarTipoSituacionComponent,
    ItemCopiaSeguridadComponent,
    ListaCopiaSeguridadComponent,
    CrearCopiaSeguridadComponent,
    GruposComponent,
    RestaurarCopiaSeguridadComponent,
    NuevoAgendaComponent,
    HistoricoTipoSituacionComponent,
    CrearHistoricoTipoSituacionComponent,
    ModificarHistoricoTipoSituacionComponent,
    ItemHistoricoTipoSituacionComponent,
    GruposComponent,
    ItemAgendaComponent,
    ItemHistoricoAgendaComponent,
    ListaHistoricoAgendaComponent,
    ModificarHistoricoAgendaComponent,
    ModificarAgendaComponent,
    NuevoHistoricoAgendaComponent,
    ListaAlarmasComponent,
    ModificarCerrarAlarmaComponent,
    ItemAlarmaComponent,
    ListaTerminalComponent,
    ItemTerminalComponent,
    CrearTerminalComponent,
    ModificarTerminalComponent,
    CrearPacienteComponent,
    ItemPacienteComponent,
    ListaPacienteComponent,
    ModificarPacienteComponent,
    CrearCentroSanitarioAlarmaComponent,
    ModificarCentroSanitarioAlarmaComponent,
    ListaCentroSanitarioAlarmaComponent,
    ItemCentroSanitarioAlarmaComponent,
    ItemRecursoComunitarioAlarmaComponent,
    ListaRecursoComunitarioAlarmaComponent,
    CrearRecursoComunitarioAlarmaComponent,
    ModificarRecursoComunitarioAlarmaComponent,
    ModificarPersonaContactoAlarmaComponent,
    CrearPersonaContactoAlarmaComponent,
    ListaPersonaContactoAlarmaComponent,
    ItemPersonaContactoAlarmaComponent,
    ItemDispositivosAuxiliaresTerminalComponent,
    ListaDispositivosAuxiliaresTerminalComponent,
    CrearDispositivosAuxiliaresTerminalComponent,
    ModificarDispositivosAuxiliaresTerminalComponent,
    ModificarRelacionUsuarioCentroComponent,
    CrearRelacionUsuarioCentroComponent,
    ItemRelacionUsuarioCentroComponent,
    ListaRelacionUsuarioCentroComponent,
    ModificarTeleoperadorAlarmaComponent,
    GruposComponent,
    CrearUserServicioComponent,
    ConsultarUsersServicioComponent,
    VerRecursoComponent,
    CrearAlarmaComponent,
    CrearPersonaContactoComponent,
    CrearDatosSanitariosComponent,
    MostrarCrearComponent,


    BotonInfoAyudasComponent,


    NuevoTipoViviendaComponent,
    DispositivosComponent,
    MostrarClasificacionAlarmaComponent,
    ModificarUserServicioComponent,
    EditarDatosSanitarioComponent,
    ModificarPersonaComponent,
    EditarTipoViviendaComponent,
    EditarContactoComponent,
    MostrarEditarContactoComponent,
    CrearEditarContactoComponent,
    DispositivosEditarComponent,
    ModificarPasswordComponent,
    ModificarImagenUsuarioComponent,
    ModificarPasswordUsuarioComponent,
    TiposRecursosComunitariosComponent,
    UserAgendasAlarmasResueltasComponent,
    ItemTeleoperadorComponent,
    ListaAlarmasResueltasComponent,
    ItemAgendasResueltasComponent,
    EditMostrarClasificacionAlarmaComponent,
    ItemAlarmasResueltasComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgSelectModule,
        CommonModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        NgbCollapseModule
    ],
  providers: [
    CargaUserService,
    CargaClasificacionAlarmaService,
    CargaTipoCentroSanitarioService,
    CargaTipoRecursoComunitarioService,
    CargaTipoModalidadPacienteService,
    CargaTipoAlarmaService,
    CargaDireccionService,
    CargaCentroSanitarioService,
    CargaRecursoComunitarioService,
    CargaPersonaService,
    CargaRelacionTerminalRecursosComunitariosService,
    CargaViviendaService,
    CargaHistoricoTipoSituacionService,
    CargaTipoAgendaService,
    CargaAgendaService,
    CargaAlarmaService,
    CargaPacienteService,
    CargaTerminalesService,
    Title,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})export class AppModule {
}


