import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HiveService } from '../hive.service';
import { Router, ActivatedRoute } from '@angular/router';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  returnUrl: string;
  errorMessage: string;
  successMessage: string;
  returnUser: any;
  user = {
    email: <string> null,
    password_hash: <string> null,
  };

  constructor(
    private HiveService: HiveService,
    private route: ActivatedRoute,
    private router: Router
  ){};

  ngOnInit() {
    localStorage.removeItem('currentUser');
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  login() {
    this.errorMessage = "";
    this.successMessage = "";

    this.HiveService.login("validateUser", this.user)
        .subscribe(
            (data) => {
              this.returnUser = data;
              if (this.returnUser.length == 0){
                  this.errorMessage = "Incorrect Email Address or Password. Please try again, or sign up for a new account!";
              } else {
                  this.router.navigate(["/home"]);
              }
              localStorage.setItem('currentUser', JSON.stringify(this.returnUser))
              console.log(this.returnUser)
            },
            error =>  this.errorMessage = <any>error
            );
    }

}
