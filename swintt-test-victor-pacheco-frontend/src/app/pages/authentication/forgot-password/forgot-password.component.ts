import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import {Constants} from "../../../services/constants";
import {AuthorizationService, IUser} from "../../../services/authorization.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  loading = false;
  isConfirm = false;
  loadingResend = false;
  showResendLink = true;
  timeToShowResendLink = Constants.START_TIME_TO_RESEND_CONFORMATION_CODE;

  limitResendReached = false;
  showPasswordHints = false;

  messageAlert = '';
  showAlert = false;
  typeAlert = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]),
  });

  formVerification = new FormGroup({
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(Constants.PASSWORD_MIN_LENGTH),
      this.renameError(Validators.pattern(Constants.PATTERN_AT_LEAST_ONE_NUMBER), 'number') as ValidatorFn,
      this.renameError(Validators.pattern(Constants.PATTERN_AT_LEAST_ONE_UPPER), 'upper') as ValidatorFn,
      this.renameError(Validators.pattern(Constants.PATTERN_AT_LEAST_ONE_LOWER), 'lower') as ValidatorFn,
      this.renameError(Validators.pattern(Constants.PATTERN_AT_LEAST_SPECIAL_CHARACTER), 'character') as ValidatorFn,
      this.renameError(Validators.pattern(Constants.PATTERN_NOT_START_OR_END_WITH_SPACE), 'space') as ValidatorFn
    ]),
  });

  renameError(validator: ValidatorFn, name: string): ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      const result = validator(control);
      if (result) {
        const keys = Object.keys(result);
        if (keys.length === 1) {
          result[name] = result[keys[0]];
          delete result[keys[0]];
        } else if (keys.length > 1) {
          // Just in case validator for some reason returns multiple errors
          result[name] = {valid: false};
        }
      }
      return result;
    };
  }

  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  get f() {
    return this.form.controls;
  }

  get fv() {
    return this.formVerification.controls;
  }

  forgotPassword(){
    this.loading = true;
    this.showAlert = false;

    this.authorizationService.forgotPassword(<IUser>this.form.value)
      .then(() => {
        this.loading = false;
        this.isConfirm = true;
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
          this.timeToShowResendLink =  Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + ":" +
            (Math.floor((distance % (1000 * 60)) / 1000)).toString().padStart(2, '0');
          if (distance < 0) {
            clearInterval(x);
            this.showResendLink = true;
          }
        }, 1000);
      })
      .catch(error => {
        this.typeAlert = Constants.ERROR;
        this.showAlert = true;
        if(error['code'] == 'LimitExceededException'){
          this.limitResendReached = true;
          this.messageAlert = `You have reached the maximum resend limit, try resending another code later or enter the last code received.`;
        } else {
          this.messageAlert = `Failed to send reset code, please try again`;
        }
        this.loading = false;
      });
  }

  forgotPasswordSubmit(){

    this.loading = true;
    this.showAlert = false;

    let forgotPasswordRequest = {
      email: this.form.value.email || '',
      code: this.formVerification.value.code || '',
      password: this.formVerification.value.password || '',
    } as IUser;

    this.authorizationService.forgotPasswordSubmit(forgotPasswordRequest)
      .then(() => {
        this.authorizationService.signIn(forgotPasswordRequest)
          .then(data => {
            this.router.navigate(['/']);
          })
          .catch(error => {
            this.loading = false;
            this.typeAlert = Constants.ERROR;
            this.messageAlert = `Failed to login`;
            this.showAlert = true;
          });
      })
      .catch(error => {
        this.loading = false;
        this.showAlert = true;
        if(error['code'] == 'LimitExceededException'){
          this.limitResendReached = true;
          this.showAlert = false;
        } else if(error['code'] == 'InvalidPasswordException'){
          this.typeAlert = Constants.ERROR;
          this.messageAlert = `Password does not meet requirements`;
        } else if(error['code'] == 'CodeMismatchException'){
          this.typeAlert = Constants.WARNING;
          this.messageAlert = `Invalid code, try again`;
        } else {
          this.typeAlert = Constants.ERROR;
          this.messageAlert = `An error has occurred, please try again`;
        }
      });;

  }

  siteName(){
    return Constants.SITE_NAME;
  }

}
