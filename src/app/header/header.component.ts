import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import {AuthService} from "../usuarios/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
      let username = this.authService.usuario.username;
      this.authService.logout();

      swal.fire(
        'Perfecto!',
        `Adios ${ username }!. Has cerrado sesión con éxito!`,
        'success'
      ).then();

      this.router.navigate(['/login']).then();
  }
}
