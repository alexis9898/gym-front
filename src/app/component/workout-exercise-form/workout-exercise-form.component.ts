import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Muscle } from '../../model/muscle';
import { Exercise } from '../../model/exercise';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MaterialModule } from '../../Module/material.module';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { WorkoutExercise } from '../../model/workoutExercise';
import { Set } from '../../model/set';

@Component({
  selector: 'app-workout-exercise-form',
  standalone: true,
  imports: [
    MaterialModule,
    AsyncPipe,
    MatAutocompleteModule,
  ],
  templateUrl: './workout-exercise-form.component.html',
  styleUrl: './workout-exercise-form.component.scss'
})
export class WorkoutExerciseFormComponent implements OnInit,OnDestroy,OnChanges{

  workoutExerciseForm: FormGroup=new FormGroup({});
  muscle: Muscle[];
  filteredOptions?: Observable<Exercise[]>;
  destroy$ = new Subject();

  @Input() exerciseOption: Exercise[]=[];
  @Output() addexerciseMuscle=new EventEmitter<WorkoutExercise>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);


    // if (changes.exerciseOption) {
    //   const newValue = changes.exerciseOption.currentValue;
    //   const previousValue = changes.exerciseOption.previousValue;
    // }
  }

  ngOnInit() {


    this.initForm();

    this.filteredOptions = this.workoutExerciseForm.get('name')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

 initForm() {
    this.workoutExerciseForm = new FormGroup({
      // 'id': new FormControl(null),
      name: new FormControl(''),
      setsReps: new FormControl(3,[Validators.min(1)]),
      reps: new FormControl(8,[Validators.min(1)]),
      weghit: new FormControl(1,[Validators.min(0.1)]),
    });



  }

  private _filter(value: string) {

    const filterValue = value.toLowerCase();
    var combain=[]
    var filter=this.exerciseOption.filter(option => option.name.toLowerCase().includes(filterValue));
    return filter;

  }

  onSubmit() {
    console.log(this.workoutExerciseForm);
    var exerciseName = this.workoutExerciseForm.get('name')?.value;
    if(!exerciseName)
      return console.log('exercise name is required');

    var setsReps = this.workoutExerciseForm.get('setsReps')?.value;
    setsReps?setsReps:1;

    var reps = this.workoutExerciseForm.get('reps')?.value;
    reps?reps:1;

    var weghit = this.workoutExerciseForm.get('weghit')?.value;
    weghit?weghit:1;

    var exercise=this.exerciseOption.find(exercise=>exercise.name==exerciseName);
    if(!exercise)
      return console.log('exercise not found');

    var sets:Set[]=[];
    console.log(setsReps);
    for (let i = 0; i < setsReps; i++){
      var set=new Set(0,0,reps,weghit);
      sets.push(set);
    }

    var workoutExercise=new WorkoutExercise(0,0,exercise.id,exercise,sets);
    console.log(workoutExercise);

    this.addexerciseMuscle.emit(workoutExercise);

  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
  }

}


