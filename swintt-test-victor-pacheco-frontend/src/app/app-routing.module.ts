import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardLogged, AuthGuardNotLogged} from "./services/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'my-notes', pathMatch: 'full' },
  {
    path: '',
    canActivateChild: [AuthGuardNotLogged],
    loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: '',
    canActivateChild: [AuthGuardLogged],
    loadChildren: () => import('./pages/notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
