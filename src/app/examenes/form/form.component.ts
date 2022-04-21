import { Component, OnInit } from '@angular/core';
import {Curso} from "../../models/curso";
import {Profesor} from "../../models/profesor";
import {ProfesorService} from "../../services/profesores.service";
import {CursoService} from "../../services/curso.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert2";
import {Examen} from "../../models/examen";
import {ExamenService} from "../../services/examen.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormExamenComponent implements OnInit {
  examen: Examen = new Examen();
  cursos: Curso[] = [];
  // @ts-ignore
  public errores: string[];

  constructor(
    private cursoService: CursoService,
    private examenService: ExamenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['idCurso'];
      if(id) {
        this.examenService.mostrar(id).subscribe((examen: Examen) => {
          this.examen = examen;
          console.log('examen desde backend: ', examen);
        });
      }
    });

    this.cursoService.listar().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  crear(): void {
    this.examenService.crear(this.examen).subscribe(curso => {
      this.router.navigate(['/profesores']).then();

      swal.fire('Perfecto!', `El examen ${curso.nombre} ha sido creado con éxito`,  'success').then();
    }, err => {
      this.errores = err.error.errors as string[];
      console.log('codigo del error desde el backend: ' + err.status);
      console.log(err.error.errors);
    });
  }

  actualizar(): void {
    // @ts-ignore
    //this.profesor.cursos = null;

    this.examenService.actualizar(this.examen).subscribe(response => {
      this.router.navigate(['/profesores']).then();

      swal.fire('Examen actualizado', `${response.mensaje}: ${response.examen.nombre}`, 'success').then();
    }, err => {
      this.errores = err.error.errors as string[];
      console.log('codigo del error desde el backend: ' + err.status);
      console.log(err.error.errors);
    });
  }

  comparar(cursoFor: Curso, cursoExamen: Curso): boolean {
    if(cursoFor === undefined && cursoExamen === undefined) {
      return true;
    }

    return cursoFor === null || cursoExamen === null || cursoFor === undefined || cursoExamen === undefined ? false: cursoFor.id === cursoExamen.id;
  }

  cancelar(): void {
    this.location.back();
  }
}
