import { Component, inject, Inject, Input, Output } from '@angular/core';
import { Set } from '../../model/set';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../Module/material.module';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-set',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './set.component.html',
  styleUrl: './set.component.scss',
})
export class SetComponent {
  // @Input() set: Set;
  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: Set
  // ) {}

  readonly dialogRef = inject(MatDialogRef<SetComponent>);
  data = inject<Set>(MAT_DIALOG_DATA);
  reps = new FormControl(this.data.repetitionsCount);
  weight = new FormControl(this.data.weight);

  onNoClick(): void {
    const result = this.data;
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.data.repetitionsCount = this.reps.value ? this.reps.value : 0;
    this.data.weight = this.weight.value ? this.weight.value : 0;
    const result = this.data;
    this.dialogRef.close(result);
  }
}
