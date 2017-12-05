import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Order } from '../../shared/order';

@Component({
  selector: 'order-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  inputs: ['itemList', 'packList', 'vendors', 'by', 'order']
})
export class TableComponent implements OnInit {

  public itemList;
  public packList;
  public vendors;
  public by;
  public order: Order[];

  constructor(private cookieService: CookieService) { }

  ngOnInit() {

  }

  @Output()
  changeVendor: EventEmitter<object> = new EventEmitter();
  change(vendorId, itemId, itemIndex){
    console.log(vendorId, itemId)
    let vendorName: string;

    for(let vendor of this.vendors){//getting vendorName
      if(vendor.id == vendorId){
        vendorName = vendor.name;
      }
    }

    let data = {vendorId: vendorId, vendorName: vendorName, itemId: itemId, itemIndex: itemIndex}
    this.changeVendor.emit(data);
  }

 

  increase(itemInd){
    console.log( itemInd)
    this.itemList[itemInd]['quantity']++;
  }

  decrease(itemInd){
    console.log(itemInd)
    if(this.itemList[itemInd]['quantity'] > 0){
      this.itemList[itemInd]['quantity']--;
    }
  }



updateOrder(itemId, pack, vendorId, quantity){
  let i = 0;
  if(this.order.length > 0){
    for(let i = 0; i < this.order.length; i++){                   //going thru each item in order
      if(this.order[i].i == itemId){                              //if item exist then update
        if(quantity != 0){
          this.order[i]['q'] = quantity;
          this.order[i]['v'] = vendorId;
          this.order[i]['p'] = pack;
        }else{
          this.order.splice(i, 1);
        }
        this.setCookie();                                       //set cookie after update
        break;
      }else{                                                    //if not exist and
        if(i+1 == this.order.length){                           // loop is done addinf new item into order
          let data: Order = new Order(itemId, vendorId, pack, quantity);
          this.order.push(data);
          this.setCookie();                                     //set cookie after adding new item
        }
      }
    }
  }else{                                                      //adding first item
    let data: Order = new Order(itemId, vendorId, pack, quantity);
    this.order.push(data);
    this.setCookie();                                   //set cookie after adding new item
  }
    
}

setCookie(){
  let orderCookie = JSON.stringify(this.order)
  this.cookieService.set( 'order', orderCookie, 36001000 );
}

}
