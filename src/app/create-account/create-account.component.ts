import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { HiveService } from '../hive.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  enterPassWord: string;
  confirmPassWord: string;
  errorMessage: string;
  successMessage: string;
  returnUser: any;
  user = {
    email: <string> null,
    password_hash: <string> null,
  };


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX),
    Validators.nullValidator
  ]);

  passFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private HiveService: HiveService
  ){};

  ngOnInit() {
  }

  onSubmit() {

    this.errorMessage = "";
    this.successMessage = "";
    
    this.HiveService.addUser("addUser", this.user)
      .subscribe(
        (data) => {
          this.returnUser = data;
          if (this.returnUser.length == 0){
              this.errorMessage = "An account is already registered with that email address. Please try another email or sign in using the link below.";
          } else {
              this.successMessage = "Account created successfully. Proceed to login page to continue."
          }
          console.log(this.returnUser)
        },
        error =>  this.errorMessage = <any>error);
    };

}
