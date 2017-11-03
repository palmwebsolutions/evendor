import { Component, OnInit, EventEmitter, Output} from '@angular/core';

import { CRUD } from '../../shared/crud';

@Component({
  selector: 'new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css'],
  inputs: ['modal', 'allItems', 'family']
})
export class NewListComponent implements OnInit {

  public userItemsList = [];
  public allItems;
  public family;
  public modal;

  private userItemsUrl='http://localhost/evendorAPI/userlist.php';

  constructor(private crud: CRUD) { }

  ngOnInit() {
    this.crud.read(this.userItemsUrl, '')
    .subscribe(
      result=>{
        this.userItemsList = result;
        this.getUserList();//call func witch will transmit list to item-list.component 
      }
    )
  }


//Remove item from user items list
  removeFromList(vendorInd, vendorId, itemInd, itemId, familyId){
    this.crud.delete(this.userItemsUrl, itemId)
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
      this.crud.update(this.userItemsUrl, data)
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
}
