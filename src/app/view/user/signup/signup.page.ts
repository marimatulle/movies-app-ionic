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
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  registerNewUser!: FormGroup;

  constructor(private router: Router,
    private auth: AuthService,
    private alert: Alert,
    private builder: FormBuilder) { 
      this.registerNewUser = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        confPassword: new FormControl('')
      });
    }

  ngOnInit() {
    this.registerNewUser = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get errorControl() {
    return this.registerNewUser.controls;
  }

  submitForm() {
    if(!this.registerNewUser.valid) {
      this.alert.presentAlert('OK', 'Error when signing in!');
    } this.register();
  }

  private register() {
    this.auth.register(this.registerNewUser.value['email'], this.registerNewUser.value['password'])
    .then((res) => {
      this.alert.presentAlert('OK', 'Welcome!');
      this.router.navigate(['/signin']);})
    .catch((error) => {
      this.alert.presentAlert('ERROR', 'Error when signing up!');
    })
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }

}
