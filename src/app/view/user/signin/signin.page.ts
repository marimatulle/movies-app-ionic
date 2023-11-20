import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signInto!: FormGroup;

  constructor(
    private router: Router,
    private alert: Alert,
    private auth: AuthService,
    private builder: FormBuilder
  ) {
    this.signInto = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
    this.signInto = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get errorControl() {
    return this.signInto.controls;
  }

  submitForm() {
    if (!this.signInto.valid) {
      this.alert.presentAlert('OK', 'Error when signing in!');
    }
    this.signin();
  }

  private signin() {
    this.auth
      .signInto(this.signInto.value['email'], this.signInto.value['password'])
      .then((res) => {
        this.alert.presentAlert('OK', 'Welcome!');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.alert.presentAlert('OK', 'Error when signing in! Try again');
      });
  }

  signinWithGmail() {
    this.auth
      .signinWithGoogle()
      .then((res) => {
        this.alert.presentAlert('OK', 'Welcome!');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.alert.presentAlert('OK', 'Error when signing in! Try again');
      });
  }

  signinWithTwitter() {
    this.auth
      .signinWithX()
      .then((res) => {
        this.alert.presentAlert('OK', 'Welcome!');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.alert.presentAlert('OK', 'Error when signing in! Try again');
      });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
