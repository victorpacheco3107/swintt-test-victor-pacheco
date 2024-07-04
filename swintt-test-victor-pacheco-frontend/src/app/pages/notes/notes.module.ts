import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TablerIconsModule} from "angular-tabler-icons";
import * as TablerIcons from "angular-tabler-icons/icons";
import {TasksRoutes} from "./notes.routing";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ListNotesComponent,
    CreateNoteComponent,
    UpdateNoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TasksRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSnackBarModule,
    TablerIconsModule.pick(TablerIcons),
  ]
})
export class NotesModule { }
