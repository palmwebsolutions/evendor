import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CRUD } from '../../shared/crud';

import { packList } from '../../shared/packaging';
import { url } from '../../shared/url';
import { Group } from '../../shared/group';

@Component({
  selector: 'new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css'],
  inputs: ['modal', 'allItems', 'family']
})
export class NewListComponent implements OnInit {

  public userItemsList = [];
  public allItems;
  private family;
  public modal;
  public packList = packList;
  private groups: Group[];
  private url = url;

  constructor(private crud: CRUD, private http: HttpClient) { }

  ngOnInit() {
    console.log(packList)
    this.http.get<any>(this.url.userItems)
      .subscribe(
        result=>{
          this.userItemsList = result;
          this.getUserList();//call func witch will transmit list to item-list.component 
          console.log(this.userItemsList)
        },
        error=>{
          console.log(error);
        },
        ()=>{}
      )
    /* this.crud.read(this.url.userItems, '')
    .subscribe(
      result=>{
        this.userItemsList = result;
        this.getUserList();//call func witch will transmit list to item-list.component 
        console.log(this.userItemsList)
      }
    ) */
    this.crud.read(this.url.group, '')
    .subscribe(
      result=>{
        this.groups = result;
        console.log(this.groups)
      },
      error=>{

      }
    );
  }


//Remove item from user items list
  removeFromList(vendorInd, vendorId, itemInd, itemId, familyId){
    this.crud.delete(this.url.userItems, itemId)
    .subscribe(
      result=>{
          if(result === 1){
            this.userItemsList[vendorInd]['items'].splice(itemInd, 1);
            for(var i = 0; i < this.family.length; i++){
              if(familyId == this.family[i]['id']){
                if(this.allItems[i]['items'].length > 0){
                  for(let item of this.allItems[i]['items']){
                    if(item.id == itemId){
                      item['vendorId'] = null;
                      item['vendorName'] = null;
                    }
                  }
                }
              }
            }
          }else{
            this.modal.text = "Couldn't remove from list";
            this.modal.errDisplay = "block";
          }
    });
    
  }


  @Output()
  userList: EventEmitter<object> = new EventEmitter;
  
  getUserList(){//func witch will transmit list to item-list.component 
    this.userList.emit() //event to transmit userlist
  }


  @Output()
  note: EventEmitter<object> = new EventEmitter();

  addNote(itemInd, vendorInd){
    let data = {itemInd: itemInd, vendorInd: vendorInd};
    this.note.emit(data);
  }


  changeVendor(newIndex, prevIndex, itemIndex, newId, prevId, itemId, familyId, newName){
    if(newIndex != "" && prevIndex != newIndex){
      let data = {newId: newId, prevId: prevId, itemId: itemId};
      this.crud.update(this.url.userItems, data)
        .subscribe(result=>{
          if(result === 1){
            this.userItemsList[newIndex]['items'].push(this.userItemsList[prevIndex]['items'][itemIndex]);
            this.userItemsList[prevIndex]['items'].splice(itemIndex, 1);
            for(var i = 0; i < this.family.length; i++){
              if(familyId == this.family[i]['id']){
                if(this.allItems[i]['items'].length > 0){
                  for(let item of this.allItems[i]['items']){
                    if(item.id == itemId){
                      item['vendorId'] = newId;
                      item['vendorName'] = newName;
                     break;
                    }
                  }
                }
              }
            }
          }else{
             this.modal.text = "Couldn't move to other vendor";
             this.modal.errDisplay = "block";
          }
        });
    }
  }


  //Change package

  changePack(itemId, itemInd, vendorId, vendorInd, pack){
    console.log(itemId, itemInd, vendorId, vendorInd, pack)
    let data = {vendorId: vendorId, itemId: itemId, pack: pack};
    this.crud.update(this.url.userItems, data)
      .subscribe(result=>{
        if(result != 1){
          this.userItemsList[vendorInd]['items'][itemInd]['pack'] = 'Case';
          this.modal.text = "Couldn't change packaging";
          this.modal.errDisplay = "block";
        }
        }, 
        error=>{
          this.userItemsList[vendorInd]['items'][itemInd]['pack'] = 'Case';
          this.modal.text = "Couldn't change packaging";
          this.modal.errDisplay = "block";
        }
      );//subscribe
  }//changePack


  //Change group

  changeGroup(itemId, groupId, itemInd, vendorInd){
    console.log(itemId, groupId, itemInd, vendorInd)
    this.crud.update(this.url.group, {itemId: itemId, id: groupId})
      .subscribe(
        result=>{
          if(result != 1){
            this.userItemsList[vendorInd]['items'][itemInd]['group'] = 0;
            this.modal.text = "Couldn't change packaging";
            this.modal.errDisplay = "block";
          }
        },
        error=>{

        }
      );
  }
}
