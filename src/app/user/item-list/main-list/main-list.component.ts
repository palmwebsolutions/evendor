import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//import { family } from '../../shared/family';

@Component({
  selector: 'main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.css'],
  inputs: ['allItems', 'vendors']
})
export class MainListComponent implements OnInit {
  public allItems = this.allItems;
  
  constructor() { }
  ngOnInit() {

  }

  @Output()
  getFamilyItems: EventEmitter<object> = new EventEmitter();
  getItems(familyId, index){
    let data = {familyId: familyId, index: index}
    this.getFamilyItems.emit(data);
  }

  @Output()
  addToList: EventEmitter<object> = new EventEmitter();
  add(familyInd, itemInd, vendorInd){
    let data = {familyInd: familyInd, itemInd: itemInd, vendorInd: vendorInd};
    this.addToList.emit(data);
  }
}
