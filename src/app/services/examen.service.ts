import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Examen} from "../models/examen";

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private urlEndPoint  =  environment.urlBackend + '/api/examen';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  listar(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + '/listar');
  }

  mostrar(id: number): Observable<any> {
    return this.http.get<Examen>(`${this.urlEndPoint}/mostrar/${id}`).pipe(
      catchError( e => {
        if(e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/profesores']).then();
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  crear(examen: Examen): Observable<Examen> {
    return this.http.post(this.urlEndPoint + '/crear', examen).pipe(
      map((response: any) => response.examen as Examen),
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

  actualizar(examen: Examen): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/actualizar/${examen.id}`, examen).pipe(
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

  delete(id: number): Observable<Examen> {
    return this.http.delete<Examen>(`${this.urlEndPoint}/eliminar/${id}`).pipe(
      catchError( e => {
        if(e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
