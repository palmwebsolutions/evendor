import { Contact } from './../shared/contacts';
import { url } from './../shared/url';
import { AuthService } from './../../services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from './../shared/account';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private url = url;
  public showAccount = true;
  public editContacts = false;
  public editCredentials = false;
  public contacts: Contact;
  public account: Account = new Account('','','','','','','');
  private token = new HttpParams().set('token', this.auth.token)

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    this.http.get<Contact>(this.url.accounts, {params: this.token})
      .subscribe(
        result=>{
          console.log(result);
          this.contacts = result[0];
          console.log(this.contacts);
        },
        error=>{
          console.log(error)
        },
        ()=>{
          this.contacts.phone = this.contacts.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        }
      );
  }



  editedContacts(data){
    this.contacts = data;
    this.editContacts = false;
  }

  showContacts(){
    this.editContacts = !this.editContacts;
    this.showAccount = !this.editContacts;
  }

  showCredentials(){
    this.editCredentials = !this.editCredentials;
    this.showAccount = !this.editCredentials;
  }
}
