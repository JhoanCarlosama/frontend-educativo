import { Component, OnInit } from '@angular/core';
import {ProfesorService} from "../services/profesores.service";
import {Profesor} from "../models/profesor";
import {ActivatedRoute} from "@angular/router";
import Swal from 'sweetalert2';
import {MatDialog} from "@angular/material/dialog";
import {DetalleComponent} from "./detalle/detalle.component";
import {AuthService} from "../usuarios/auth.service";

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  profesores: Profesor[] = [];
  paginator: any;
  profesorSeleccionado: any;

  displayedColumns: string[] = ['id', 'nombre', 'correo', 'createAt', 'acciones'];
  dataSource: any;

  constructor(
    private profesorService: ProfesorService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      // @ts-ignore
      let page:number = +params.get('page');

      if(!page) {
        page = 0;
      }

      this.profesorService.listarPage(page).subscribe(response => {
        this.profesores = response.content as Profesor[];
        this.dataSource = this.profesores;
        this.paginator = response;
      });
    });
  }

  delete(profesor: Profesor): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Seguro que desea eliminar al profesor ${profesor.nombre} ${profesor.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesorService.delete(profesor.id).subscribe(() => {
          this.profesores = this.profesores.filter(p => p !== profesor);

          this.dataSource = this.profesores;

          Swal.fire(
            'Borrado!',
            `Profesor ${profesor.nombre} eliminado con éxito.`,
            'success'
          ).then()
        });
      }
    });
  }

  abrirModal(profesor: Profesor) {
    this.profesorSeleccionado = profesor;

    this.dialog.open(DetalleComponent, {
      width: '70%',
      data: {
        profesor: this.profesorSeleccionado
      },
    });
  }
}
