import { Component, OnInit } from '@angular/core';
import {Curso} from "../models/curso";
import {ProfesorService} from "../services/profesores.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CursoService} from "../services/curso.service";
import {Profesor} from "../models/profesor";
import swal from "sweetalert2";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  curso: Curso = new Curso();
  profesores: Profesor[] = [];
  // @ts-ignore
  public errores: string[];

  constructor(
    private profesorService: ProfesorService,
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['idProfesor'];
      if(id) {
        this.cursoService.mostrar(id).subscribe((curso: Curso) => {
          this.curso = curso;
          console.log('curso desde backend: ', curso);
        });
      }
    });

    this.profesorService.listar().subscribe(profesores => {
      this.profesores = profesores;
    });
  }

  crear(): void {
    this.cursoService.crear(this.curso).subscribe(curso => {
      this.router.navigate(['/profesores']).then();

      swal.fire('nuevo curso', `El curso ${curso.nombre} ha sido creado con éxito`,  'success').then();
    }, err => {
      this.errores = err.error.errors as string[];
      console.log('codigo del error desde el backend: ' + err.status);
      console.log(err.error.errors);
    });
  }

  actualizar(): void {
    // @ts-ignore
    //this.profesor.cursos = null;

    this.cursoService.actualizar(this.curso).subscribe(response => {
      this.router.navigate(['/profesores']).then();

      swal.fire('Curso actualizado', `${response.mensaje}: ${response.curso.nombre}`, 'success').then();
    }, err => {
      this.errores = err.error.errors as string[];
      console.log('codigo del error desde el backend: ' + err.status);
      console.log(err.error.errors);
    });
  }

  comparar(profesorFor: Profesor, profesorCurso: Profesor): boolean {
    if(profesorFor === undefined && profesorCurso === undefined) {
      return true;
    }

    return profesorFor === null || profesorCurso === null || profesorFor === undefined || profesorCurso === undefined ? false: profesorFor.id === profesorCurso.id;
  }
}
