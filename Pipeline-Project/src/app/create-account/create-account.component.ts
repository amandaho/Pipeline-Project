import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  enterPassWord: string;
  confirmPassWord: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  passFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor() { }

  ngOnInit() {
  }

  onSubmit(c: FormControl) {
    console.log(this.enterPassWord);
    console.log(this.confirmPassWord)
    return this.enterPassWord.localeCompare(this.confirmPassWord) ? null : {
      onSubmit : {
        valid : false
      }
    }
  }

    // if (this.enterPassWord == this.confirmPassWord){
    //     return null;
    //   } else {
    //    return valid: false;
       
    //   }


}
