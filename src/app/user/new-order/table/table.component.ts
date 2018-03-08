import { AuthService } from './../../../services/auth.service';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Order } from '../../shared/order';
import { packList } from '../../shared/packaging';

@Component({
  selector: 'order-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  inputs: ['itemList', 'vendors', 'by', 'order', 'isReview', 'onUpdate', 'vendorIndex']
})
export class TableComponent implements OnInit {

  public itemList;
  public packList = packList;
  public vendors;
  public by;
  public order: Order[];
  public isReview = false;
  public onUpdate;
  public vendorIndex;

  constructor(private cookieService: CookieService, private auth: AuthService) { }

  ngOnInit() {
   
  }

  @Output()
  changeVendor: EventEmitter<object> = new EventEmitter();
  change(vendorId, itemId, itemIndex, pack, quantity, itemName){
    let vendorName: string;
    let vendorIndex;
    let data;
    console.log(vendorId, itemId, itemIndex, pack, quantity)
    for(let v = 0; v < this.vendors.length; v++){//getting vendorName
      if(this.vendors[v].id == vendorId){
        vendorName = this.vendors[v].name;
        vendorIndex = v;
      }
    }

    data = {vendorId: vendorId, vendorName: vendorName, itemId: itemId, itemIndex: itemIndex, vendorIndex: vendorIndex, prevVendorIndex: this.vendorIndex}
    
    if(!this.onUpdate){
      this.changeVendor.emit(data);
      this.updateOrder(itemId, pack, vendorId, quantity);
    }else{
      if(quantity != 0){
        this.updateHistoryItem(itemId, pack, vendorId, quantity, itemName, vendorIndex);
        console.log(vendorIndex)
      }
      

      this.changeVendor.emit(data);
      /* console.log(this.itemList[itemIndex].vendorId)
      this.itemList[itemIndex].vendorId = vendorId;
      this.itemList[itemIndex].vendorName = vendorName; */
      console.log(itemIndex)
      console.log(this.itemList)
      //console.log(this.itemList[itemIndex].vendorId)
      
    }
    
  }

 

  increase(itemInd){
    console.log(itemInd)
    this.itemList[itemInd]['quantity']++;
    console.log(this.itemList[itemInd])
    this.updateOrder(this.itemList[itemInd]['id'], this.itemList[itemInd]['pack'], this.itemList[itemInd]['vendorId'], this.itemList[itemInd]['quantity'], this.itemList[itemInd]['name'])
  }

  decrease(itemInd){
    console.log(itemInd)
    if(this.itemList[itemInd]['quantity'] > 0){
      this.itemList[itemInd]['quantity']--;
      this.updateOrder(this.itemList[itemInd]['id'], this.itemList[itemInd]['pack'], this.itemList[itemInd]['vendorId'], this.itemList[itemInd]['quantity'], this.itemList[itemInd]['name']);      
    }
  }



updateOrder(itemId, pack, vendorId, quantity, itemName?){ //updateOrder needed  only to keep order in storage 
  if(!this.onUpdate){ //updating new order
    console.log(itemId, pack, vendorId, quantity)
    if(this.updateOrder) return false; //if updating order from history dont need to save order in cookie
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
            this.setCookie();                                    //set cookie after adding new item
            break; 
          }
        }
      }
    }else{                                                      //adding first item
      let data: Order = new Order(itemId, vendorId, pack, quantity);
      this.order.push(data);
      this.setCookie();              //set cookie after adding new item
    }
  }else{//update old order from orders history  DOESNT KEEP IN CASH
    this.updateHistoryItem(itemId, pack, vendorId, quantity, itemName)
  }
  
}

updateHistoryItem(itemId, pack, vendorId, quantity, itemName, vendorIndex?){
  let index = this.vendors[this.vendorIndex]['changesMap'].indexOf(itemId)
  if( index == -1){
    this.vendors[this.vendorIndex]['changesMap'].push(itemId);
    this.vendors[this.vendorIndex]['changes'].push({pack: pack, vendorId: vendorId, quantity: quantity, itemId: itemId, name: itemName});
     console.log(this.vendors)
  }else{
    this.vendors[this.vendorIndex]['changes'][index] = {pack: pack, vendorId: vendorId, quantity: quantity, itemId: itemId, name: itemName};
  }

  if(vendorIndex >= 0){//on vendor change
    console.log(vendorIndex)
    let index = this.vendors[vendorIndex]['changesMap'].indexOf(itemId)
    if( index == -1){
      this.vendors[vendorIndex]['changesMap'].push(itemId);
      this.vendors[vendorIndex]['changes'].push({pack: pack, vendorId: vendorId, quantity: quantity, itemId: itemId, name: itemName});
       console.log(this.vendors)
    }else{
      this.vendors[vendorIndex]['changes'][index] = {pack: pack, vendorId: vendorId, quantity: quantity, itemId: itemId, name: itemName};
    }

    index = this.vendors[this.vendorIndex]['changesMap'].indexOf(itemId)
    let prevVendorId = this.vendors[this.vendorIndex]['id']
    if( index == -1){
      this.vendors[this.vendorIndex]['changesMap'].push(itemId);
      this.vendors[this.vendorIndex]['changes'].push({pack: pack, vendorId: prevVendorId, quantity: 0, itemId: itemId, name: itemName});
       console.log(this.vendors)
    }else{
      this.vendors[this.vendorIndex]['changes'][index] = {pack: pack, vendorId: prevVendorId, quantity: 0, itemId: itemId, name: itemName};
    }
  }
}
  setCookie(){
    let orderCookie = JSON.stringify({order: this.order, token: this.auth.token});
    localStorage.setItem('order', orderCookie);
  }




}
