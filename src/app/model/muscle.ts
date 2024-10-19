import { Exercise } from "./exercise";

export class Muscle {

  constructor(
    public id: number,
    public name: string,
    public exercise:Exercise[]
  ) {}
}

