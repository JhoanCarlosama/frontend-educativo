import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() paginator: any;
  paginas: any;
  desde: number = 0;
  hasta: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes:SimpleChanges) {
    let paginatorActualizado = changes['paginator'];

    if(paginatorActualizado.previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginator.number-4), this.paginator.totalPages-5);
    this.hasta = Math.max(Math.min(this.paginator.totalPages, this.paginator.number+4), 6);
    if(this.paginator.totalPages > 5) {
      this.paginas = new Array(this.desde - this.hasta + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginator.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
