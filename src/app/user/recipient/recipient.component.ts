import { Component, OnInit } from '@angular/core';

import { Recipient } from '../shared/recipient';
import { RecipientService} from '../shared/recipientService';
import { vendorService } from '../shared/vendorService';
import { Vendor } from '../shared/vendor'; 

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {

  constructor(private RecipientService: RecipientService, private VendorService: vendorService) { }

  ngOnInit() {
    this.RecipientService.getRecipients().then(result=>this.recipients = result);
    this.VendorService.getVendors().then(result=>this.vendors = result);
  }


  public recipients: Recipient[];
  public recipient: Recipient;
  public vendors: Vendor[];
  public edit: boolean = false;
  public add: boolean = false;
  public flag: boolean[] = [];
  public dummyVendors: Vendor[] = [];
  
  removeRecipient(index){
    this.recipients.splice(index, 1);
  }

  saveRecipient(data){
    if(data.id !== undefined || data.id > 0){
      //save to DB
      this.recipients[data.index] = data;
      this.recipient = new Recipient("", "", "", this.dummyVendors);
    }else{
      this.recipients.push(data);//save to DB
      this.recipient = new Recipient("", "", "", this.dummyVendors);
    }
    this.add = false;
    this.edit = false;
    
  }

  editRecipient(data){
    window.scrollTo(0,0);
    console.log(data)
    this.recipient = data;
    this.recipient.vendor = this.recipients[data.index]['vendor'];
    for(var i = 0; i < this.vendors.length; i++){
      this.flag[i] = false;
      for(var r = 0; r < this.recipient.vendor.length; r++){
        if(this.recipient.vendor[r]['id'] == this.vendors[i]['id']){
          this.flag[i] = true;
        }
      }
    }
    this.edit = true;
    this.add = false;
  }

  newRecipient(){
    this.add = true;
    this.edit = false;
    this.recipient = new Recipient("", "", "", this.dummyVendors);
    for(var i = 0; i < this.vendors.length; i++){
      this.flag[i] = false;
    }
  }

  cancel(){
    this.recipient = new Recipient("", "", "", this.dummyVendors);
    this.add = false;
    this.edit = false;
  }

}

  


