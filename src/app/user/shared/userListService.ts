import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpParams} from '@angular/common/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Item } from './item';


@Injectable()
export class UserListService{
    private url = "http://localhost/evendorAPI/userlist.php";
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http){}

    getUserList(): Observable<any[]>{
        return this.http
            .get(this.url)
            .map((response: Response)=><any[]>response.json())
    }

    deleteItem(itemId){
        let data={itemId: itemId};
        return this.http
                        .delete(this.url + "/" + JSON.stringify(data))
                        .map((response: Response)=><number>response.json())
        
    }

    addItem(itemId, vendorId): Observable<any>{
        let options = new RequestOptions({ headers: this.headers });
        let data = {itemId: itemId, vendorId: vendorId}
        return this.http
                    .post(this.url,  JSON.stringify(data), options)
                    .map((response: Response)=><number>response.json())
            
    } 


    changeVendor(data){
        let options = new RequestOptions({ headers: this.headers });
        return this.http
                    .put(this.url, JSON.stringify(data), options) 
                    .map((response: Response)=><number>response.json())
    }
}