import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { Routes } from "@angular/router";
import {SignInComponent} from "./signin/sign-in.component";
import {SignOutComponent} from "./signout/sign-out.component";


export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },

      {
        path: 'signin',
        component: SignInComponent,
      },
      {
        path: 'signout',
        component: SignOutComponent,
      },
    ],
  },
];
