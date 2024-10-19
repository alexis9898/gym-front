import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { WorkoutService } from '../../service/workout.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Workout } from '../../model/wourkout';
import { Muscle } from '../../model/muscle';
import { MuscleService } from '../../service/muscle.service';
import { MaterialModule } from '../../Module/material.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Exercise } from '../../model/exercise';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { WorkoutExercise } from '../../model/workoutExercise';
import { WorkoutExerciseFormComponent } from '../workout-exercise-form/workout-exercise-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SetComponent } from '../set/set.component';
import { Set } from '../../model/set';
import { MatAccordion } from '@angular/material/expansion';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    MaterialModule,
    AsyncPipe,
    MatAutocompleteModule,
    WorkoutExerciseFormComponent,
    MatTableModule,
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss',
})
export class WorkoutComponent implements OnInit, AfterViewInit {
  expanded = true;

  id: number;
  workoutForm: FormGroup;
  editMode = false;
  workout: Workout;
  // Muscles:Muscle[];
  //myControl = new FormControl('');
  allMuscles: Muscle[] = [];
  muscleOfWorkout: Muscle[] = [];
  exerciseOption: Exercise[] = [];
  workoutExercises: WorkoutExercise[] = [];
  displayedColumns: string[] = ['position', 'reps', 'weight'];
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  readonly dialog = inject(MatDialog);
  accordion = viewChild.required(MatAccordion);
  date = new Date();
  constructor(
    private workoutService: WorkoutService,
    private ActiveRoute: ActivatedRoute,
    private muscleService: MuscleService,
    private cdr: ChangeDetectorRef // public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.date);
    this.ActiveRoute.params.subscribe((params) => {
      this.id = params['id'];

      if (this.id != null) {
        this.get();
      }
      // setTimeout(() => {this.expanded = true;}, 7000);
    });

    this.initForm();
    this.getArray();
  }
  ngAfterViewInit() {
    // Trigger change detection
    this.cdr.detectChanges();
  }

  get() {
    this.workoutService.getWorkout(this.id).subscribe((data) => {
      console.log(data);
      this.workout = data;
      this.editMode = true;
      this.workoutExercises = this.workout.workoutExercises;

      this.muscleOfWorkout = this.workout.muscles;
      for (let i = 0; i < this.muscleOfWorkout.length; i++) {
        this.exerciseOption = this.exerciseOption.concat(
          this.muscleOfWorkout[i].exercise
        );
        console.log(this.exerciseOption);
      }
    });
  }

  getArray() {
    this.muscleService.getMuscles().subscribe((data) => {
      this.allMuscles = data;
      // this.Muscles = data;
    });
  }

  initForm() {
    this.workoutForm = new FormGroup({
      // name:new FormControl(this.workout ? this.workout.name :''),
      date: new FormControl(this.workout ? this.workout.start : ''),

      //workoutExercises: []
    });
  }

  addMuscle(muscle: Muscle) {
    if (this.muscleOfWorkout.find((m) => m.id == muscle.id)) {
      console.log('Muscle already added');
      return;
    }
    this.muscleOfWorkout.push(muscle);
    this.exerciseOption = [];
    this.muscleOfWorkout.forEach((muscle) => {
      this.exerciseOption = this.exerciseOption.concat(muscle.exercise);
    });
  }

  addExirciseToWorkout(WorkoutExercise: WorkoutExercise) {
    var exist = this.workoutExercises.find(
      (w) => w.exercise.name == WorkoutExercise.exercise.name
    );
    if (exist) {
      console.log('Exercise already added');
      return;
    }
    this.accordion().closeAll();
    console.log('closed');
    this.workoutExercises.push(WorkoutExercise);
  }

  combineExercises() {}

  submit() {
    console.log(this.workoutExercises);
    console.log(this.workout);
    var id = this.workout ? this.workout.id : 0;
    var date = this.date;
    var workout = new Workout(
      id,
      date,
      this.workoutExercises,
      this.muscleOfWorkout
    );
    console.log(workout);
    workout.workoutExercises = this.workoutExercises;
    workout.muscles = this.muscleOfWorkout;
    // new Workout(this.id, this.workoutForm.value.date, this.workoutExercises);
    console.log(JSON.stringify(workout));
    this.editMode ? this.update(workout) : this.add(workout);
  }

  add(workout: Workout) {
    this.workoutService.post(workout).subscribe((data) => {
      console.log(data);
    });
  }
  update(workout: Workout) {
    this.workoutService.put(workout).subscribe((data) => {
      console.log(data);
    });
  }

  openDialog(set: Set) {
    console.log(set);
    const dialogRef = this.dialog.open(SetComponent, {
      width: '70%',
      data: set,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result !== undefined) {
        console.log(result);
        // this.animal.set(result);
        set = result;
      }
    });
  }

}
