import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CRUD } from '../../shared/crud';

@Component({
  selector: 'main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.css'],
  inputs: ['allItems', 'vendors']
})

export class MainListComponent implements OnInit {

  public allItems = this.allItems;
  private url='http://localhost/evendorAPI/itemservice.php';
  
  constructor(private crud: CRUD) { }
  ngOnInit() {

  }

  getItems(familyId, index){
    this.crud.read(this.url, familyId)
        .subscribe(
          result=>{
            this.allItems[index]['items'] = result;
          }
        );
  }


  @Output()
  addToList: EventEmitter<object> = new EventEmitter();
  add(familyInd, itemInd, vendorInd, vendorId, itemId){
    console.log(vendorId)
    let data = {familyInd: familyInd, itemInd: itemInd, vendorInd: vendorInd, vendorId: vendorId, itemId: itemId};
    this.addToList.emit(data);
  }
}
