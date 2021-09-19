import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenService } from '../authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isShowLoginFailMessage: boolean = false;

  constructor(public router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private authenService: AuthenService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submitLogin() {
    this.authenService.submitLogin(this.loginForm.value).subscribe(response => {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'];
      localStorage.setItem('isAuthen', 'true');

      if(returnUrl) {
        this.router.navigate([returnUrl]);
      } else {
        this.router.navigate(['/']);
      }

      this.authenService.updateLogin();
    },
    error => {
      this.loginForm.controls.username.setErrors(Validators.compose);
      this.loginForm.controls.password.setErrors(Validators.compose);
      this.isShowLoginFailMessage = true;
    });
  }
}
