import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from 'service/data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public dataService: DataServiceService,
    private toastr: ToastrService,
    public router: Router
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    if (localStorage.getItem('isLogin')) {
      this.router.navigate(['home']);
    }
  }

  signUp() {
    if (this.registerForm.valid) {
      this.dataService.getUser().subscribe((data: any) => {
        let checkUser = data.find((element: any) => {
          return element.email === this.registerForm.value.email;
        });
        if (checkUser) {
          this.toastr.error('Already Email Taken', 'Registration Failed');
        } else {
          this.dataService
            .createUser(this.registerForm.value)
            .subscribe((res) => {
              if (res) {
                this.toastr.success(
                  'User has been created',
                  'Registration Done'
                );
                this.router.navigate(['login']);
              }
            });
        }
      });
    } else {
      this.toastr.error('Your data is Incorrect', 'Incorrect Data');
    }
  }
}
