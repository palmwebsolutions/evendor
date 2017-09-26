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
  public vendors: Vendor[];
  
  removeRecipient(index){
    this.recipients.splice(index, 1);
  }

  saveRecipient(data){
    if(data.add == true){
      this.recipients.push(data.recipient)
    }
    console.log('added to Db', data)
    //save to DB
  }
}

  


