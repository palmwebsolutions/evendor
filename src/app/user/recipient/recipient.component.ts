import { Component, OnInit } from '@angular/core';

import { Recipient } from '../shared/recipient';
import { Vendor } from '../shared/vendor'; 
import { modal } from '../shared/modal'; 
import { CRUD } from '../shared/crud';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {

  public modal = modal;
  public vendors: Vendor[];
  public recipients: Recipient[];
  public recipient: Recipient;
  public edit: boolean = false;
  public add: boolean = false;
  public flag: boolean[] = [];
  public dummyVendors: Vendor[] = [];
  public agreeToRemoveData;
  

  private vendorUrl = "http://localhost/evendorAPI/vendor.php";
  private recipientUrl = "http://localhost/evendorAPI/recipient.php";


  constructor(private crud: CRUD) { }

  ngOnInit() {
    this.crud.read(this.vendorUrl, '')
    .subscribe(
      result=>{
        this.vendors = result;
      },
      error=>{}
    );

    this.crud.read(this.recipientUrl, '')
    .subscribe(
      result=>{
        this.recipients = result;
      },
      error=>{}
    );
  }


  ///////////////////////// Remove recipient

  agreeToRemove(){
    this.crud.delete(this.recipientUrl, {id: this.agreeToRemoveData.id})
    .subscribe(result=>{
      if(result === 1){
        this.recipients.splice(this.agreeToRemoveData.index, 1);
        this.agreeToRemoveData = {};
        this.modal.text2 = '';
        this.modal.agreementDisplay = "none";
      }else{
        this.modal.text = "Couldn't remove recipient";
        this.modal.errDisplay = "block";
      }
    });
  }

  removeRecipient(id, index){
    this.agreeToRemoveData = {id: id, index: index};
    console.log(this.agreeToRemoveData)
    this.modal.text2 = this.recipients[index]['name'];
    this.modal.agreementDisplay = "block";
   }
 
  ///////////////////////// End Of Remove recipient


  ///////////////////////// Save new recipient or Update exist

  saveRecipient(data){
    console.log(data)
    if(data.id !== undefined || data.id > 0){//if id exist update recipient else create recipient
      this.crud.update(this.recipientUrl, data)
      .subscribe(result=>{
        if(result === 1){
          this.recipients[data.index] = data;
          this.recipient = new Recipient("", "", "", this.dummyVendors);
        }else{
          this.modal.text = "Couldn't update recipient";
          this.modal.errDisplay = "block";
        }
      });
      
    }else{
      this.crud.create(this.recipientUrl, data)
      .subscribe(result=>{
        if(result !== 0 && result > 0){
          data.id = result;
          this.recipients.push(data);
        }else{
          this.modal.text = "Couldn't add recipient";
          this.modal.errDisplay = "block";
        }
      });
       this.recipient = new Recipient("", "", "", this.dummyVendors);
    }
    this.add = false;
    this.edit = false;
  }

   ///////////////////////// End of Save new recipient or Update exist

   

   ////////////////////////// Edit recipient


   newRecipient(){// show add or edit window  ---edit button or --add new recipient button
    this.add = true;
    this.edit = false;
    this.recipient = new Recipient("", "", "", this.dummyVendors);
    for(var i = 0; i < this.vendors.length; i++){
      this.flag[i] = false;
    }
  }


  editRecipient(name, email, phone, id, index){
    window.scrollTo(0,0);
    this.recipient = {name: name, email: email, phone: phone, id: id, index: index, vendor: this.recipients[index]['vendor']};
    for(var i = 0; i < this.vendors.length; i++){
      this.flag[i] = false;
      if(this.recipient.vendor){
        for(var r = 0; r < this.recipient.vendor.length; r++){
          if(this.recipient.vendor[r]['id'] == this.vendors[i]['id']){
            this.flag[i] = true;
          }
        }
      }
      
    }
    this.edit = true;
    this.add = false;
  }

   ////////////////////////// End of edit recipient



  ////////////////////////// Cancel Create, Update recipient

 cancel(){
    this.recipient = new Recipient("", "", "", this.dummyVendors);
    this.add = false;
    this.edit = false;
  }

  ////////////////////////// End of Cancel Create, Update recipient

}

  


