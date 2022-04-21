import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Profesor} from "../models/profesor";
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private urlEndPoint  =  environment.urlBackend + '/api/profesor';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  listar(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + '/listar');
  }

  listarPage(page: number): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + '/listar/page/' + page);
  }

  mostrar(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.urlEndPoint}/mostrar/${id}`).pipe(
      catchError( e => {
        if(e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/profesores']).then();
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  crear(profesor: Profesor): Observable<Profesor> {
    return this.http.post(this.urlEndPoint + '/crear', profesor).pipe(
      map((response: any) => response.profesor as Profesor),
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

  actualizar(profesor: Profesor): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/actualizar/${profesor.id}`, profesor).pipe(
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

  delete(id: number): Observable<Profesor> {
    return this.http.delete<Profesor>(`${this.urlEndPoint}/eliminar/${id}`).pipe(
      catchError( e => {
        if(e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
