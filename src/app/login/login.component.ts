import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from 'service/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public showSign: boolean = false;

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public dataService: DataServiceService,
    private toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('isLogin')) {
      this.router.navigate(['home']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  Login() {
    if (this.loginForm.valid) {
      this.dataService.getUser().subscribe((data: any) => {
        let checkUser = data.find((element: any) => {
          return (
            element.email === this.loginForm.value.email &&
            element.password === this.loginForm.value.password
          );
        });
        if (checkUser) {
          localStorage.setItem('isLogin', 'true');
          this.router.navigate(['home']);
          this.toastr.success('User Login Successfully', 'Login Success');
        } else
          this.toastr.error('Email and Password is Incorrect', 'Invalid Creds');
      });
    }
  }
}
