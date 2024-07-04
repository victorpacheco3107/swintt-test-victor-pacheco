import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService, IUser } from "../../../services/authorization.service";
import { Constants } from "../../../services/constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  loading: boolean;
  isConfirm: boolean;

  loadingResend = false;
  showResendLink = true;
  timeToShowResendLink = Constants.START_TIME_TO_RESEND_CONFORMATION_CODE;

  limitResendReached = false;

  showPasswordHints = false;

  messageAlert = '';
  showAlert = false;
  typeAlert = '';

  form = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]),
    password: new UntypedFormControl('', [
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
    return (control: UntypedFormControl): ValidationErrors | null => {
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

  formVerification = new UntypedFormGroup({
    code: new UntypedFormControl('', [Validators.required]),
  });

  constructor(private authorizationService: AuthorizationService, private router: Router) {
    this.loading = false;
    this.isConfirm = false;
  }

  get f() {
    return this.form.controls;
  }

  signUp() {
    this.loading = true;
    this.authorizationService.signUp(<IUser>this.form.value)
      .then(() => {
        this.loading = false;
        this.isConfirm = true;
        this.showAlert = false;
      }).catch(error => {
        console.log(error['code']);
        this.loading = false;
        this.typeAlert = Constants.ERROR;
        if(error['code'] == 'UsernameExistsException'){
          this.messageAlert = `Previously registered email, log in or try a different one`;
        } else if(error['code'] == 'InvalidPasswordException'){
          this.messageAlert = `Password does not meet requirements`;
        } else {
          this.messageAlert = `An error has occurred, please try again`;
        }
        this.showAlert = true;

      }
    );
  }

  resendSignUp() {
    this.loadingResend = true;
    this.showAlert = false;
    this.authorizationService.resendSignUp({
      email: this.form.value.email || '',
      code: this.formVerification.value.code || ''
    })
      .then(() => {
        this.loadingResend = false;
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
            this.router.navigate(['/my-notes']);
          })
          .catch(error => {
            this.loading = false;
            this.typeAlert = Constants.ERROR;
            this.messageAlert = `Failed to login`;
            this.showAlert = true;
          });
      }).catch(error => {
      this.loading = false;
      if(error['code'] == 'CodeMismatchException'){
        this.typeAlert = Constants.WARNING;
        this.messageAlert = `Invalid code, try again`;
      } else {
        this.typeAlert = Constants.ERROR;
        this.messageAlert = `An error has occurred, please try again`;
      }
      this.showAlert = true;
    });
  }

  google(){
    this.authorizationService.googleSocialSignIn();
  }

  siteName(){
    return Constants.SITE_NAME;
  }

}
