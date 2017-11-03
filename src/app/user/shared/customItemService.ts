import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomItemService{
    private url = "http://localhost/evendorAPI/customItem.php";
    private headers = new Headers({'content-Type': 'application/json'});
    constructor(private http: Http){}

    addCustomItem(data): Observable<any>{
        let options = new RequestOptions({headers: this.headers});
        return this.http.post(this.url, JSON.stringify(data), options)
        .map((response: Response)=><number>response.json())
    }
}