import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { packList } from '../shared/packaging';
import { Order } from '../shared/order';
import { Vendor } from '../shared/vendor';
import { userConfig } from '../shared/userConfig';
import { url } from '../shared/url';
import { Group } from '../shared/group';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  
  public vendors: any;
  public packList = packList;
  public userConfig = userConfig;
  public sortBy = this.userConfig.orderList;
  public itemList: any = [];
  public itemListByVendor: any = [];
  public itemListByGroup: any = [];
  public itemListBy: any = [];
  public by: string = 'byOrder';
  public order: Order[] = [];
  public cookieValue = 'UNKNOWN';
  private url = url;
  private groups: Group[];

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
      this.http.get(this.url.vendor)//getting vendors
        .subscribe(  //vendors subscribe
          result=>{
          this.vendors = result;
          },
          error=>{},
          ()=>{
            this.http.get<Group[]>(this.url.group)//getting groups after vendors subscribe is done
            .subscribe(//group subscribe
              result=>{
                this.groups = result;
              },
              error=>{},
              ()=>{  //getting itemList after vendors, groups subscribe is done
                this.http.get(this.url.userListForOrder)
                  .subscribe(
                    result=>{// itemList subscribe
                      this.itemList = result;
                      console.log(result)
                    },
                    error=>{

                    },
                    ()=>{//get exist unfinished order from cookie
                      this.getCookies();
                    }
                  );//itemList subscribe
              }
            );//group subscribe
          }
        );//vendor subscribe
  }

  arrange(byWhat){
    this.itemListBy = [];
    let items = [];
    
    if(byWhat == 'byVendor'){
      for(let by of this.vendors){
        for(let item of this.itemList){
          if(item.vendorId == by.id){
            items.push(item);
          }
        }
        this.itemListBy.push({name: by.name, id: by.id, items: items});
        this.by = byWhat;
        items = [];
      }
    }else{
      if(this.groups.length > 0){
        for(let by of this.groups){
          for(let item of this.itemList){
            if(item.groupId == by.id){
              items.push(item);
            }
          }
          this.itemListBy.push({name: by.name, id: by.id, items: items});
          this.by = byWhat;
          items = [];
      }
      
      }
    }
  }

  clear(){
    //modal
    let reset = true
    if(reset){
      this.http.get(this.url.userListForOrder)
      .subscribe(
        result=>{
          this.itemList = result;
          this.arrange(this.by);
          console.log(result)
        },
        error=>{}
      );
    }
  }

  changeVendor(data){
    let vendorId = data.vendorId;
    let vendorName = data.vendorName;
    let itemIndex = data.itemIndex;
    let itemId = data.itemId;
    if(this.by !== 'byOrder'){
      let i = 0;
      for(let item of this.itemList){
        if(item.id == itemId){
          itemIndex = i;
          break;
        }
        i++;
      }
    }
    this.itemList[itemIndex]['vendorId'] = vendorId;
    this.itemList[itemIndex]['vendorName'] = vendorName;
    if(this.by !== 'byOrder'){
      this.arrange(this.by);
    }
  }

  getCookies(){
    console.log('hello')
    const cookieExists: boolean = this.cookieService.check('order');
    if(cookieExists){
      this.order = JSON.parse(this.cookieService.get('order'));
      for(let item of this.order){
        for(let i = 0; i < this.itemList.length; i++){
          if(this.itemList[i]['id'] == item.i){
            this.itemList[i]['vendorId'] = item.v;
            this.itemList[i]['pack'] = item.p;
            this.itemList[i]['quantity'] = item.q;
            break;
          }
        }
      }
    }
    console.log(this.order)
  }













  test(){
    this.cookieValue = this.cookieService.get('order');
    console.log(this.cookieValue)
    console.log(this.itemList)
    
  }

  test2(){
    this.cookieService.delete('order');
  }

}
