import { Muscle } from './muscle';
export class Exercise {
  constructor(
    public id: number,
    public name: string,
    //public description: string,
    public Muscle : Muscle[],
  ) {}
}

