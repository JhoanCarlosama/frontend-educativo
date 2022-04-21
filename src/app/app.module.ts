import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MaterialModule } from "./material.module";

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfesoresComponent } from './profesores/profesores.component';

import {registerLocaleData} from "@angular/common";
import localeCO from '@angular/common/locales/es-CO';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './profesores/detalle/detalle.component';
import { FormComponent } from './profesores/form/form.component';
import { LoginComponent } from './usuarios/login.component';
import {TokenInterceptor} from "./usuarios/interceptors/token.interceptor";
import {AuthInterceptor} from "./usuarios/interceptors/auth.interceptor";
import { CursosComponent } from './cursos/cursos.component';
import { DetalleCursoComponent } from './cursos/detalle/detalle-curso.component';
import { ExamenesComponent } from './examenes/examenes.component';
import {FormExamenComponent} from "./examenes/form/form.component";
import {DetalleExamenComponent} from "./examenes/detalle/detalle.component";

registerLocaleData(localeCO, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfesoresComponent,
    PaginatorComponent,
    DetalleComponent,
    FormComponent,
    LoginComponent,
    CursosComponent,
    DetalleCursoComponent,
    ExamenesComponent,
    FormExamenComponent,
    DetalleExamenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO'},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
