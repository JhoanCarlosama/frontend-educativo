import { Component, OnInit } from '@angular/core';
import {Curso} from "../../models/curso";
import {CursoService} from "../../services/curso.service";
import {ActivatedRoute} from "@angular/router";
import {ExamenService} from "../../services/examen.service";
import {Examen} from "../../models/examen";
import swal from "sweetalert2";
import {DetalleExamenComponent} from "../../examenes/detalle/detalle.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.css']
})
export class DetalleCursoComponent implements OnInit {

  // @ts-ignore
  curso: Curso;

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource: any = 0;

  constructor(
    private cursoService: CursoService,
    public examenService: ExamenService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      // @ts-ignore
      let id = +params.get('id');
      this.cursoService.mostrar(id).subscribe(curso => {
        this.curso = curso
        this.dataSource = this.curso.examenes;
      });
    });
  }

  delete(examen: Examen): void {
    swal.fire({
      title: 'Estás seguro?',
      text: `¿Seguro que desea eliminar el examen ${examen.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.delete(examen.id).subscribe(response => {
          this.curso.examenes = this.curso.examenes.filter(e => e !== examen);

          this.dataSource = this.curso.examenes;

          swal.fire(
            'Examen Eliminado!',
            `Examen ${examen.nombre} eliminado con éxito.`,
            'success'
          ).then();
        });
      }
    });
  }

  onDetalleExamen(examen: Examen) {
    const dialogRef = this.dialog.open(DetalleExamenComponent, {
      width: '50%',
      data: {examen: examen},
    });
  }
}
