import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthorizationService, IUser} from "../../../services/authorization.service";
import {Constants} from "../../../services/constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;
  loadingResend = false;
  isConfirm = false;
  showResendLink = true;
  timeToShowResendLink = Constants.START_TIME_TO_RESEND_CONFORMATION_CODE;
  limitResendReached = false;

  showAlert = false;
  messageAlert = '';
  typeAlert = '';

  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]),
    password: new FormControl('', [Validators.required]),
  });

  formVerification = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  signIn() {
    this.showAlert = false;
    this.loading = true;
    this.authorizationService.signIn(<IUser>this.form.value)
      .then(data => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log(error);
        console.log(error['code']);
        this.loading = false;

        if(error['code'] == 'UserNotConfirmedException'){
          this.isConfirm = true;
          this.resendSignUp(true);
        } else {
          this.typeAlert = Constants.ERROR;
          this.messageAlert = `Incorrect email or password, try again`;
          this.showAlert = true;
        }

      });
  }

  google(){
    this.authorizationService.googleSocialSignIn();
  }

  resendSignUp(firstTime: boolean) {
    this.loadingResend = true;
    this.showAlert = false;
    this.authorizationService.resendSignUp({
      email: this.form.value.email || '',
      code: this.formVerification.value.code || ''
    })
      .then(() => {
        this.loadingResend = false;
        if(!firstTime) {
          this.formVerification.reset();
          this.typeAlert = Constants.PRIMARY;
          this.messageAlert = `We have sent another code to your email`;
          this.showAlert = true;
          this.showResendLink = false;
          let countDownDate = new Date();
          countDownDate.setSeconds(countDownDate.getSeconds() + Constants.TIME_TO_RESEND_CONFIRMATION_CODE);
          let countDown = countDownDate.getTime();
          this.timeToShowResendLink = Constants.START_TIME_TO_RESEND_CONFORMATION_CODE;
          let x = setInterval(() => {
            let distance = countDown - new Date().getTime();
            this.timeToShowResendLink = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + ":" +
              (Math.floor((distance % (1000 * 60)) / 1000)).toString().padStart(2, '0');
            if (distance < 0) {
              clearInterval(x);
              this.showResendLink = true;
            }
          }, 1000);
        }
      }).catch(error => {
      if (error['code'] == 'LimitExceededException') {
        this.limitResendReached = true;
      } else {
        this.typeAlert = Constants.ERROR;
        this.messageAlert = `Error sending verification code, please try again`;
        this.showAlert = true;
      }
      this.loading = false;
    });
  }

  confirmSignUp() {
    this.loading = true;
    this.authorizationService.confirmSignUp({
      email: this.form.value.email || '',
      code: this.formVerification.value.code || ''
    })
      .then(() => {
        this.authorizationService.signIn(<IUser>this.form.value)
          .then(data => {
            this.router.navigate(['/']);
          })
          .catch(error => {
            this.loading = false;
            this.typeAlert = Constants.ERROR;
            this.messageAlert = `Failed to login`;
            this.showAlert = true;
          });
      }).catch(error => {
      this.loading = false;
      if (error['code'] == 'CodeMismatchException') {
        this.typeAlert = Constants.WARNING;
        this.messageAlert = `Invalid code, try again`;
      } else {
        this.typeAlert = Constants.ERROR;
        this.messageAlert = `An error has occurred, please try again`;
      }
      this.showAlert = true;
    });
  }

  siteName(){
    return Constants.SITE_NAME;
  }

  reloadPage(){
    location.reload();
  }

}
