import { Component, OnInit, EventEmitter, Output, Directive } from '@angular/core';

import {Vendor} from '../../shared/vendor'

@Component({
  selector: 'show-recipient',
  templateUrl: './show-recipient.component.html',
  styleUrls: ['./show-recipient.component.css'],
  inputs: ['recipients', 'vendors', 'smallForm']
})
export class ShowRecipientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public smallForm: boolean;
  public flag: boolean[] = [];
  public recipients;

  @Output()
  remove: EventEmitter<number> = new EventEmitter();

  removeRecipient(index){
    this.remove.emit(index);
  }

  @Output()
  edit: EventEmitter<object> = new EventEmitter();
  editRecipient(name, email, phone, id, index){
    let data = {name: name, email: email, phone: phone, id: id, index: index}
    console.log(data)
    this.edit.emit(data);
  }


  
}
