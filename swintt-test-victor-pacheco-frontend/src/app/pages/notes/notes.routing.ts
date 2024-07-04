import { Routes } from "@angular/router";
import {ListNotesComponent} from "./list-notes/list-notes.component";
import {CreateNoteComponent} from "./create-note/create-note.component";
import {UpdateNoteComponent} from "./update-note/update-note.component";


export const TasksRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-notes',
        component: ListNotesComponent,
      },
      {
        path: 'create-note',
        component: CreateNoteComponent,
      },
      {
        path: 'update-note/:id',
        component: UpdateNoteComponent,
      },
    ],
  },
];
