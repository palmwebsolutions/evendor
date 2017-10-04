import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms'

import { Recipient } from '../../shared/recipient';
import { Vendor } from '../../shared/vendor';

@Component({
  selector: 'add-recipient',
  templateUrl: './add-recipient.component.html',
  styleUrls: ['./add-recipient.component.css'],
  inputs: ['vendors', 'recipient', 'flag']
})
export class AddRecipientComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  

  public recipient: Recipient;
  public vendors: Vendor[];
  public flag;
  

  @Output()
  save: EventEmitter<object> = new EventEmitter();
  saveRecipient(){
    let vendors = [];
    let count: number = 0;
    for (var i = 0; i < this.vendors.length; i++) {
      if(this.flag[i]==true){
        vendors.push(new Vendor(this.vendors[i]['name'], this.vendors[i]['id']));
      }
      
    }
    this.recipient.vendor = vendors;
    this.save.emit(this.recipient);
    this.recipient = new Recipient("","","",[]);
  }
  

  @Output()
  cancel: EventEmitter<null> = new EventEmitter();
  cancelEdit(){
    console.log(this.recipient)
    this.recipient = new Recipient("","","",[]);
    console.log(this.recipient)
    this.flag = [];
    this.cancel.emit();
  }

  
    
  }


