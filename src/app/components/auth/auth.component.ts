import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, Validators,
} from '@angular/forms';
import { ResponseLogin } from 'src/app/models/auth';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export default class AuthComponent implements OnInit {
  formShow: boolean = false;

  hidePassword = true;

  isRegistration = false;

  errorResponse = '';

  isLoad = false;

  registerData: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.isShowForm$.subscribe((value) => {
      this.formShow = value;
    });
  }

  closeForm() {
    this.authService.toggleFormAuth(false);
  }

  send() {
    this.isLoad = true;
    if (this.isRegistration) {
      this.authService.registration(this.registerData.value).subscribe({
        next: (res) => {
          this.loginData.setValue({
            email: res.email,
            password: this.registerData.controls['password'].value,
          });
          this.isRegistration = false;
          this.send();
        },
        error: () => {
          this.errorResponse = 'Incorrect e-mail or password';
          this.registerData.reset();
          this.isLoad = false;
        },
      });
    } else {
      this.authService.login(this.loginData.value).subscribe({
        next: (res: ResponseLogin) => {
          this.isLoad = false;
          this.loginData.reset();
          this.registerData.reset();
          this.authService.toggleFormAuth(false);
          this.authService.setLoginData(res);
        },
        error: () => {
          this.errorResponse = 'Incorrect e-mail or password';
          this.loginData.reset();
          this.isLoad = false;
        },
      });
    }
  }
}

// email: "testemail@gmail.com"
// id: "6300a4303a32620015bdf6b0"
// name: "testNameR"
// pass: 123454321
