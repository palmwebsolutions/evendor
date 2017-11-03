import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpParams } from '@angular/common/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Item } from './item';

//const getParams = new HttpParams().set('family', '"'+this.family+'"'); //zababachili get zapros

@Injectable()
export class ItemService{
    /* public items: Item[]; */
    public family: string;
    
    private url = "http://localhost/evendorAPI/itemservice.php"
    constructor(private http: Http){}

    getItems(family): Observable<Item[]>{
        return this.http
        .get(this.url+'?family='+family)
        .map((response: Response)=><Item[]>response.json());
    } 
}