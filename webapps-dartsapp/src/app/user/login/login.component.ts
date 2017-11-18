import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    console.log(control.value);
    return control.value.length < 12 ? { 'passwordTooShort': { value: control.value.length } } : null;
  };
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(private authService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  onSubmit() {
    this.authService.login(this.user.value.username, this.user.value.password).subscribe(val => {
      if (val) {
        console.log(val);
        if (this.authService.redirectUrl) {
          this.router.navigateByUrl(this.authService.redirectUrl);
          this.authService.redirectUrl = undefined;
        } else {
          this.router.navigate(['/darts/dashboard']);
        }
      }
    }, err => this.errorMsg = err.json().message);
  }
  ngOnInit() {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}