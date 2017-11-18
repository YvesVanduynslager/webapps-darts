import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';

function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? { 'passwordTooShort': { requiredLength: length, actualLength: control.value.length } } : null;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmpassword = control.get('confirmpassword');
  return password.value === confirmpassword.value ? null : { 'passwordsDiffer': true };
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;

  constructor(private authenticatorService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticatorService.checkUserNameAvailability(control.value).map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    };
  }

  onSubmit() {
    this.authenticatorService.register(this.user.value.username, this.passwordControl.value).subscribe(val => {
      if(val) {
        this.router.navigate(['/darts/dashboard']);
      }
    });
  }
  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)], this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmpassword: ['', Validators.required]
      }, { validator: comparePasswords })
    });
  }

}
