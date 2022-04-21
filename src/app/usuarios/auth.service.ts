import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Usuario} from "./usuario";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  private _usuario: Usuario;
  // @ts-ignore
  private _token: string;

  constructor(private http: HttpClient, private router: Router) { }

  public get usuario(): Usuario{
    if(this._usuario != null) {
      return this._usuario;
    } else if(this._usuario == null && sessionStorage.getItem('usuario') != null) {
      // @ts-ignore
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if(this._token != null) {
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token') != null) {
      // @ts-ignore
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    // @ts-ignore
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const  urlEndPoint =  environment.urlBackend + '/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());

    return this.http.post(urlEndPoint + '', params.toString(), { headers: httpHeaders});
  }

  guardarUsuario(access_token: string): void {
    let payload = this.obtenerDatosToken(access_token);

    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(access_token: string): void {
    this._token = access_token;

    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken(access_token: string): any {
    if(access_token != null) {
      return JSON.parse(atob(access_token.split('.')[1]));
    }

    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);

    if(payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if(this.usuario.roles.includes(role)){
      return true;
    }

    return false;
  }

  logout(): void {
    // @ts-ignore
    this._usuario = null;
    // @ts-ignore
    this._token = null;

    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
  }
}
