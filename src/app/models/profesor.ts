import {Curso} from "./curso";

export class Profesor {
  // @ts-ignore
  id: number;
  // @ts-ignore
  nombre: string;
  // @ts-ignore
  apellido: string;
  // @ts-ignore
  createAt: string;
  // @ts-ignore
  email: string;
  // @ts-ignore
  foto: string;
  cursos: Array<Curso> = [];
}
