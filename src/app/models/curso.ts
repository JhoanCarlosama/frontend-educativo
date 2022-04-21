import {Examen} from "./examen";
import {Profesor} from "./profesor";

export class Curso {
  // @ts-ignore
  id: number;
  // @ts-ignore
  nombre: string;
  // @ts-ignore
  profesor: Profesor;
  examenes: Array<Examen> = [];
}
