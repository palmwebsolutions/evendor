import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  inputs: ['modal', 'note']
})
export class ModalComponent implements OnInit {

  public modal;
  public note = {name: '', note:'', vendorInd: null, itemInd: null};

  constructor() { }

  ngOnInit() {
  }

  @Output()
  saveNote: EventEmitter<string> = new EventEmitter();

  save(){
    this.modal.noteDisplay = 'none';
    this.saveNote.emit(this.note.note);
  }

  @Output()
  agree: EventEmitter<null> = new EventEmitter();
  delete(){
    this.agree.emit();
  }

  closeModal(){
    this.modal.display = 'none';
  }


}
