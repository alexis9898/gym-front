import { Routes } from '@angular/router';
import { WorkoutComponent } from './component/workout/workout.component';

export const routes: Routes = [
  { path: '', component:WorkoutComponent },
  { path: 'workout/:id', component:WorkoutComponent },
  // { path: 'workout/:date', component:WorkoutComponent },
];
