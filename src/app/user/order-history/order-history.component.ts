import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { url } from '../shared/url';
import { month } from '../shared/month';
import { modal } from '../shared/modal';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  public url = url;
  public history: any;
  public showOrder = false;
  public order: any[];
  public years = [];
  public date = {month: '01', year: '2016'};
  public modal = modal;
  private months = month;
  
  private token = new HttpParams().set('token', this.auth.token)
  
  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    
    this.http.get(this.url.lastorders, {params: this.token})
      .subscribe(
        result=>{
          console.log(result);
          this.history = result;
        },
        error=>{
          console.log(error)
        },
        ()=>{}
      );

    let currentYear = new Date().getFullYear();
     
    for(let i = 2016;  i <= currentYear; i++){
      this.years.push(i);
    }  
  }// ngOnInit

  getOrder(id){
    
    this.http.get<any[]>(this.url.order + '/' + id, {params: this.token})
      .subscribe(
        result=>{
          console.log(result)
          this.order = result;
          this.showOrder = true;
        },
        error=>{
          console.log(error)
        },
      );
  }



  submit(){
    this.showOrder = false;
    let date = this.date.year + '-' + this.date.month;
    console.log(date)
    let params = new HttpParams().set('date', date).set('token', this.auth.token);
    this.http.get<any[]>(this.url.orders, {params: params, responseType: 'json'})
      .subscribe(
        result=>{
          console.log(result)
          if(result == null){
            this.modal.alertDisplay = 'block';
            this.modal.text2 = 'No orders placed on this period of time';
          }else{
            this.history = result;
          }
          
        },
        error=>{
          console.log(error)
        }
      );
  }

}
