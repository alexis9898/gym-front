import { Exercise } from './exercise';
import { Workout } from './wourkout';
import {Set} from './set';
export class WorkoutExercise {

  constructor(
    public id: number,
    public workoutId: number,
    //public workout: Workout,
    public exerciseId: number,
    public exercise:Exercise,
    public sets: Set[],
    
  ) {}
}
