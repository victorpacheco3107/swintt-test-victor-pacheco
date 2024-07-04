import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AuthenticationRoutes } from "./authentication.routing";
import {TablerIconsModule} from "angular-tabler-icons";
import * as TablerIcons from 'angular-tabler-icons/icons';
import { SignInComponent } from './signin/sign-in.component';
import { SignOutComponent } from './signout/sign-out.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SignInComponent,
    SignOutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
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
    MatGridListModule,
    TablerIconsModule.pick(TablerIcons),
  ]
})
export class AuthenticationModule { }
