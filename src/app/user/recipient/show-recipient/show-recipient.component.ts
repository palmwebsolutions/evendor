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

  public smallForm: boolean;
  public flag: boolean[] = [];

  @Output()
  remove: EventEmitter<object> = new EventEmitter();

  removeRecipient(){
    this.remove.emit();
  }

  @Output()
  edit: EventEmitter<object> = new EventEmitter();
  editRecipient(){
    this.edit.emit();
  }


  
}
