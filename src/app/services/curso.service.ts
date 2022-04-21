import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Curso} from "../models/curso";

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private urlEndPoint  =  environment.urlBackend + '/api/curso';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  listar(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + '/listar');
  }

  mostrar(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.urlEndPoint}/mostrar/${id}`).pipe(
      catchError( e => {
        if(e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/profesores']).then();
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  crear(curso: Curso): Observable<Curso> {
    return this.http.post(this.urlEndPoint + '/crear', curso).pipe(
      map((response: any) => response.curso as Curso),
      catchError( e => {
        if(e.status==400) {
          return throwError(e);
        }

        if(e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  actualizar(curso: Curso): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/actualizar/${curso.id}`, curso).pipe(
      catchError( e => {

        if(e.status==400) {
          return throwError(e);
        }

        if(e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Curso> {
    return this.http.delete<Curso>(`${this.urlEndPoint}/eliminar/${id}`).pipe(
      catchError( e => {
        if(e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
