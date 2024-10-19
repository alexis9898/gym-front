import { WorkoutExercise } from './workoutExercise';

export class Set {
  constructor(
    public id: number,
    public workoutExerciseId: number,
    // public workoutExercise: WorkoutExercise,
    public repetitionsCount: number,
    public weight: number
  ) {}
}
