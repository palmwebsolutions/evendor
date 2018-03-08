import { AuthService } from './../services/auth.service';
import { Signup } from './../user/shared/signup';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { url } from '../user/shared/url';
import { emailValidator} from '../validators/email.validators';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  inputs: ['editCredentials', 'signup']
})
export class SignupFormComponent implements OnInit {

  private url = url;
  public signupForm: FormGroup;
  public signup;
  public editCredentials;
  public spinner = 'none';
  public oldPassword = 'valid';
  
  public formErrors = {
    'name': [],
    'email': [],
    'password': [],
    'password2': [],
    'oldpassword': []
  }

  public validationMessages = {
    'name': {
      'required': 'Name is required',
      'maxlength': 'Name max length is 20 characters'
    },
    'email': {
      'required': 'Email is required',
      'emailValidator': 'Wrong email format',
      'emailExist': 'Email is taken'
    },
    'password': {
      'required': 'Password is required',
      'minlength': 'Passwords min length is 6 characters'
    } ,
    'password2': {
      'required': 'Password is required',
      'minlength': 'Passwords min length is 6 characters'
    },
    'oldpassword': {
      'required': 'Password is required',
      'oldPasswordValidator': 'Wrong password'
    }
  }
  


  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    if(!this.signup){
      this.signup = new Signup;
      this.signup.oldpassword = '1';
    } 
    this.buildForm()
  }

  @Output()
  cancelEdit: EventEmitter<any> = new EventEmitter;
  
  cancelCredentialEditing(){
    this.cancelEdit.emit();
  }


  buildForm(){
    this.signupForm = this.fb.group({
      'name': [this.signup.name,[
        Validators.required,
        Validators.maxLength(20)
      ]],
      'email': [this.signup.email, [
        Validators.required,
        emailValidator
      ]],
      'password': [this.signup.password, [
        Validators.required,
        Validators.minLength(6)
      ]],
      'password2': [this.signup.password2, [
        Validators.required,
        Validators.minLength(6)
      ]],
      'oldpassword': [this.signup.oldpassword, [
        Validators.required
      ]]
    });

    this.signupForm.valueChanges
    .subscribe(data=>this.onValueChange(data))

    this.onValueChange();
  }

  onValueChange(data?: any) {
    if (!this.signupForm) return;
    let form = this.signupForm;
    let password2;
    for (let field in this.formErrors) {
        this.formErrors[field] = [];//make sure that formerrors is empty from previous error messages
        
        let control = form.get(field);//access to form fild(email, password itd)
        if (control && control.dirty && !control.valid ) {
            let message = this.validationMessages[field];
            for (let key in control.errors) {
                this.formErrors[field].push(message[key]);
                console.log(this.formErrors[field])
            }
        }
      if(field == 'password2') password2 = control;
    }
    if(!password2.pristine){
      if(data && data.password !== data.password2 ){
      this.formErrors.password2.push('Password doesnt match');
    }
  }
    
}



  onSignup() {
    console.log("submitted");
    console.log(this.signupForm.value);
    let userName = this.signupForm.value.name;
    let email = this.signupForm.value.email;
    let password = this.signupForm.value.password;
    console.log(email)
    this.spinner = 'block';
    if(this.editCredentials){
      let oldpassword = this.signupForm.value.oldpassword;
      
      this.http.put(
        this.url.signup + '?token=' + this.auth.token, 
        {name: userName, email: email, password: password, oldpassword: oldpassword},
        {headers: new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})}
      )
      .subscribe(
        result=>{
          console.log(result)
          this.spinner = 'none';
          this.cancelCredentialEditing()
        },
        error=>{
          console.log(error);
          if(error.error.email && error.error.email == 'used'){
            this.formErrors.email.push('Email in use');
          }
          if(error.error.oldpassword && error.error.oldpassword == 'wrong'){
            this.formErrors.oldpassword.push('Wrong password');
          }
          this.spinner = 'none';
        }
      );

    }else{
      this.http.post(
        this.url.signup, 
        {name: userName, email: email, password: password},
        {headers: new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})}
      )
      .subscribe(
        result=>{
          console.log(result)
          this.spinner = 'none';
          this.router.navigate(['/home']);
        },
        error=>{
          console.log(error)
          this.spinner = 'none';
        }
      );
    }
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
