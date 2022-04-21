import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Examen} from "../../models/examen";
import {ExamenService} from "../../services/examen.service";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleExamenComponent implements OnInit {

  examen: Examen = new Examen();

  constructor(
    public dialogRef: MatDialogRef<DetalleExamenComponent>,
    public examenService: ExamenService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.examenService.mostrar(this.data.examen.id).subscribe(response => {
      this.examen = response
    });
  }

}
