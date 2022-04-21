import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Profesor} from "../../models/profesor";
import {AuthService} from "../../usuarios/auth.service";
import swal from "sweetalert2";
import {Curso} from "../../models/curso";
import {CursoService} from "../../services/curso.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  // @ts-ignore
  @Input() profesor: Profesor;

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource: any;

  constructor(
    public authService: AuthService,
    public cursoService: CursoService,
    public router: Router,
    public dialogRef: MatDialogRef<DetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.profesor = this.data.profesor;

    this.dataSource = this.data.profesor.cursos;
  }

  delete(curso: Curso): void {
    swal.fire({
      title: 'Estás seguro?',
      text: `¿Seguro que desea eliminar el curso ${curso.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.delete(curso.id).subscribe(response => {
          console.log(this.profesor)
          this.profesor.cursos = this.profesor.cursos.filter(c => c !== curso);

          this.dataSource = this.profesor.cursos;

          swal.fire(
            'Curso Eliminado!',
            `Curso ${curso.nombre} eliminado con éxito.`,
            'success'
          ).then();
        });
      }
    });
  }

  redirigirCrearCurso() {
    this.router.navigate(['/curso/form']).then();
    this.dialogRef.close();
  }

  onDetalleCurso(id: number) {
    this.router.navigate(['/curso/detalle', id]).then();
    this.dialogRef.close();
  }

  onFormCurso(id: number) {
    this.router.navigate(['/curso/form', id]).then();
    this.dialogRef.close();
  }
}
