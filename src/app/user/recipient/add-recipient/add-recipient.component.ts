import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms'

import { Recipient } from '../../shared/recipient';
import { Vendor } from '../../shared/vendor';

@Component({
  selector: 'add-recipient',
  templateUrl: './add-recipient.component.html',
  styleUrls: ['./add-recipient.component.css'],
  inputs: ['vendors']
})
export class AddRecipientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  
public NewRecipient: Recipient;

  //public recipient = {name: "", email: "", phone: "", vendor: 9999};
  public recipient: Recipient;
  

  @Output()
  save: EventEmitter<object> = new EventEmitter();
  addRecipient(form: NgForm, vendors: Vendor[]){
    let newVendors: Vendor[] = [];
    for (var v=0; v < vendors.length; v++) {
      if (form.value[vendors[v]['name']] == true) {
        newVendors.push(new Vendor(vendors[v]['name'], vendors[v]['id']))
      }
    }
    this.recipient = new Recipient(form.value.name, form.value.email, form.value.phone, newVendors, 0); 
     this.save.emit(this.recipient);
    
  }
   
    
  }


