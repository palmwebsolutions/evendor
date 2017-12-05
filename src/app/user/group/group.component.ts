import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Vendor } from '../shared/vendor';
import { modal } from '../shared/modal';
import { url } from '../shared/url';
import { Group } from '../shared/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  public groups: Group[];

  public modal = modal;
  public groupName;
  public editGroup = '';
  private url = url;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Group[]>(this.url.group)
    .subscribe(
      result=>{
        this.groups = result;
        console.log(this.groups)
      },
      error=>{
        console.log('groups')
      }
    );
  }

  edit(group, index){
    this.groupName = group;
    this.editGroup = index;
  }

  save(){
    console.log(this.editGroup);
    if(this.editGroup !== ''){
      this.http.put(this.url.group, {name: this.groupName, id: this.groups[this.editGroup]['id']})
        .subscribe(
          result=>{
            if(result > 0){
              this.groups[this.editGroup]['name'] = this.groupName;
              this.groupName = '';
              this.editGroup = '';
            }else{
              this.modal.text = "Couldn't save the group";
              this.modal.errDisplay = "block";
            }
          }, 
          error=>{}
        );   
    }else{
      if(this.groupName !== ''){
        this.http.post<number>(this.url.group, {name: this.groupName})
        .subscribe(
          result=>{
            if(result > 0){
              this.groups.push(new Group(this.groupName, result));
              this.groupName = '';
              this.editGroup = '';
            }else{
              console.log(this.groupName)
              this.modal.text = "Couldn't save the group";
              this.modal.errDisplay = "block";
            }
          }, 
          error=>{
            
            console.log(error)
            this.modal.text = "Couldn't save the group";
            this.modal.errDisplay = "block";
          }
        ); 
      }
    }
    
  }

  cancel(){
    this.groupName = "";
    this.editGroup = '';
  }

  remove(index, id){
    const params = new HttpParams().set('id', id);
    this.http.delete(this.url.group, {params})
      .subscribe(
        result=>{

        },
        error=>{

        }
      )
    this.groups.splice(index, 1);
  }
}
