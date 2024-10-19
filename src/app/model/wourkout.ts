import { Muscle } from './muscle';
import { WorkoutExercise } from './workoutExercise';

export class Workout {
  constructor(
    public id: number,
    public start: Date,
    //public name: string,
    //public description: string,
    public workoutExercises: WorkoutExercise[],
    //public userId: number
    public muscles: Muscle[]
  ) {}
}
