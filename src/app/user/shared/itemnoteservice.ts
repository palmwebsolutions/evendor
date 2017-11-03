import{ Injectable } from '@angular/core';
import{ Http, Response, Headers, RequestOptions } from '@angular/http';
import{ HttpParams } from '@angular/common/http';

import{ Observable } from 'rxjs/Observable';
import'rxjs/add/operator/map';

@Injectable()
export class ItemNoteService{
    public url = 'http://localhost/evendorAPI/itemnote.php';
    public headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http){}

    addNote(data): Observable<any>{
        let options = new RequestOptions({headers: this.headers});
        return this.http
                    .post(this.url, JSON.stringify(data), options)
                    .map((response: Response)=><number>response.json())

    }
    
    updateNote(data): Observable<any>{
        let options = new RequestOptions({headers: this.headers});
        return this.http
                    .put(this.url, JSON.stringify(data), options)
                    .map((response: Response)=><number>response.json())


    }

    /* deleteNote(data): Observable<any>{
        return this.http
                    .delete(this.url, JSON.stringify(data))
                    .map((response: Response)=><number>response.json())

    } */
    deleteNote(data){
        return this.http
                        .delete(this.url + "/" + JSON.stringify(data))
                        .map((response: Response)=><number>response.json())
        
    }

}