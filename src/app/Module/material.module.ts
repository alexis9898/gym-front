import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //BrowserModule,

    MatRippleModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatAutocompleteModule,

    // BrowserAnimationsModule,

  ],
  exports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //BrowserModule,

    MatRippleModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
  ]
})
export class MaterialModule { }
