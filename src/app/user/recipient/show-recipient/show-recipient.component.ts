import { Component, OnInit, EventEmitter, Output, Directive } from '@angular/core';

import {Vendor} from '../../shared/vendor'

@Component({
  selector: 'show-recipient',
  templateUrl: './show-recipient.component.html',
  styleUrls: ['./show-recipient.component.css'],
  inputs: ['recipient', 'vendors', 'smallForm']
})
export class ShowRecipientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public editRecipient: boolean = false;
  public smallForm: boolean;
  public flag: boolean[] = [];

  @Output()
  remove: EventEmitter<object> = new EventEmitter();

  removeRecipient(){
    this.remove.emit();
  }


  @Output()
  save: EventEmitter<object> = new EventEmitter();

  saveRecipient(recipient){
    let data = {recipient: recipient, add: false};
    this.save.emit(data);
    this.editRecipient = false;
  }
  

  updateVendor(recipient, vendor, checkbox){
    if(checkbox.checked == true){
      recipient.vendor.push(new Vendor(vendor.name, vendor.id))
    }else{
      for(let v = 0; v < recipient.vendor.length; v++){
        if(recipient.vendor[v]['id'] == vendor.id){
          recipient.vendor.splice(v, 1);
        }
      }
    }
  }

  getFlag(recipient, vendor, index){
    for(let v = 0; v < recipient.vendor.length; v++){
      if(recipient.vendor[v]['id'] == vendor.id){
        this.flag[index] = true;
      }
    }
    return true;
  }
  
}
