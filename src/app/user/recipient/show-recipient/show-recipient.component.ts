import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'show-recipient',
  templateUrl: './show-recipient.component.html',
  styleUrls: ['./show-recipient.component.css'],
  inputs: ['recipient', 'vendors']
})
export class ShowRecipientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public editRecipient: boolean = true;

  @Output()
  remove: EventEmitter<object> = new EventEmitter();

  removeRecipient(){
    this.remove.emit();
  }

  @Output()
  save: EventEmitter<object> = new EventEmitter();

  saveRecipient(){
    this.save.emit();
    this.editRecipient = false;
  }
  
  dosome(e){
    console.log(e.vendor[0])
  }

  changeVendor(e){
    console.log(e)
  }
}
