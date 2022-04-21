import { Component, OnInit } from '@angular/core';
import {Profesor} from "../../models/profesor";
import {ProfesorService} from "../../services/profesores.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public profesor: Profesor = new Profesor();
  public errores: string[] = [];

  constructor(
    private profesorService: ProfesorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id) {
        this.profesorService.mostrar(id).subscribe((profesor: Profesor) => {
          this.profesor = profesor;
        });
      }
    });
  }

  crear() {
    this.profesorService.crear(this.profesor).subscribe(profesor => {
      this.router.navigate(['/profesores']);

      swal.fire('nuevo profesor', `El profesor ${profesor.nombre} ha sido creado con éxito`,  'success').then();
    }, err => {
      this.errores = err.error.errors as string[];
      console.log('codigo del error desde el backend: ' + err.status);
      console.log(err.error.errors);
    });
  }

  actualizar(): void {
    // @ts-ignore
    this.profesor.cursos = null;

    this.profesorService.actualizar(this.profesor).subscribe(json => {
      this.router.navigate(['/profesores']).then();

      swal.fire('Profesor actualizado', `${json.mensaje}: ${json.profesor.nombre}`, 'success').then();
    }, err => {
      this.errores = err.error.errors as string[];
      console.log('codigo del error desde el backend: ' + err.status);
      console.log(err.error.errors);
    });
  }
}
