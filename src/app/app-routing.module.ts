import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfesoresComponent} from "./profesores/profesores.component";
import {FormComponent} from "./profesores/form/form.component";
import {AuthGuard} from "./usuarios/guards/auth.guard";
import {RoleGuard} from "./usuarios/guards/role.guard";
import {LoginComponent} from "./usuarios/login.component";
import {CursosComponent} from "./cursos/cursos.component";
import {DetalleCursoComponent} from "./cursos/detalle/detalle-curso.component";
import {FormExamenComponent} from "./examenes/form/form.component";
import {DetalleExamenComponent} from "./examenes/detalle/detalle.component";

const routes: Routes = [
  { path: '', redirectTo: '/profesores', pathMatch: 'full' },
  { path: 'profesores', component: ProfesoresComponent },
  { path: 'profesor/listar/page/:page', component: ProfesoresComponent },
  { path: 'profesor/form', component: FormComponent, canActivate: [ AuthGuard, RoleGuard ], data: { role: 'ROLE_ADMIN' } },
  { path: 'profesor/form/:id', component: FormComponent, canActivate: [ AuthGuard, RoleGuard ], data: { role: 'ROLE_ADMIN' } },
  { path: 'curso/detalle/:id', component: DetalleCursoComponent, canActivate: [ AuthGuard, RoleGuard ], data: { role: 'ROLE_ADMIN' } },
  { path: 'curso/form', component: CursosComponent, canActivate: [ AuthGuard, RoleGuard ], data: { role: 'ROLE_ADMIN' } },
  { path: 'curso/form/:idProfesor', component: CursosComponent, canActivate: [ AuthGuard, RoleGuard ], data: { role: 'ROLE_ADMIN' } },
  { path: 'examen/form', component: FormExamenComponent, canActivate: [ AuthGuard, RoleGuard ], data: { role: 'ROLE_ADMIN' } },
  { path: 'examen/form/:idCurso', component: FormExamenComponent, canActivate: [ AuthGuard, RoleGuard ], data: { role: 'ROLE_ADMIN' } },
  //{ path: 'examen/detalle/:id', component: DetalleExamenComponent, canActivate: [ AuthGuard, RoleGuard ], data: { role: 'ROLE_ADMIN' } },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
