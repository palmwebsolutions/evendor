import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { NewListComponent } from './new-list/new-list.component' //Needed for @viewChild

import { CRUD } from '../shared/crud';


import { Item } from '../shared/item';
import { Vendor } from '../shared/vendor';
import { family } from '../shared/family';
import { modal } from '../shared/modal';
import { url } from '../shared/url';



@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  
  public family = family;
  public allItems: any[] = [];
  public vendors: Vendor[];
  public userItemsList = [];
  public modal = modal;
  public userId = 1;
  public note = {name: '', note:'', vendorInd: null, itemInd: null}
  private mainItemsUrl='http://localhost/evendorAPI/itemservice.php';
  private itemNoteUrl='http://localhost/evendorAPI/itemnote.php';
  private customItemUrl = "http://localhost/evendorAPI/customItem.php";
  private userListUrl = "http://localhost/evendorAPI/userlist.php";
  private vendorUrl = "http://localhost/evendorAPI/vendor.php";
  private url = url;

  
  constructor(private crud: CRUD, private http: HttpClient) { }
  ngOnInit() {
    this.http.get<Vendor[]>(this.url.vendor)
      .subscribe(
        result=>{
          this.vendors = result;
        },
        error=>{
          console.log(error);
        },
        ()=>{}
      );
    /* this.crud.read(this.vendorUrl, '')
    .subscribe(
      result=>{
        this.vendors = result;
      }
    ) */

    for(var i = 0; i < this.family.length; i++){// empty allItems for view
      this.allItems.push({name: this.family[i]['name'], id: this.family[i]['id'], items: []});
    }
    
  }// END of NgOnInit
    

  @ViewChild(NewListComponent) // Access to child component
  list: NewListComponent;

  userList(){// geting userList
    this.userItemsList = this.list.userItemsList;
  }


//////////////////////////////////////////////   ADD ITEM TO USER LIST 

  addToList(data){// adding items to new items list
    this.crud.create(this.userListUrl, {itemId: data.itemId, vendorId: data.vendorId})
    .subscribe(
      result=>{
        if(result === 1){
          this.allItems[data.familyInd]['items'][data.itemInd]['pack'] = 'Case';
          this.userItemsList[data.vendorInd]['items'].push(this.allItems[data.familyInd]['items'][data.itemInd]);// add item to userItemsList
          console.log(data) 
          console.log(this.userItemsList) 
          console.log(this.allItems) 
          this.allItems[data.familyInd]['items'][data.itemInd]['vendorId'] = this.vendors[data.vendorInd]['id']; //add vendor id to allitems list
          this.allItems[data.familyInd]['items'][data.itemInd]['vendorName'] = this.vendors[data.vendorInd]['name']; //add vendor name to allitems list
        }else{
          this.modal.text = "Couldn't add to list";
          this.modal.errDisplay = "block";
        }
      }
    )
    
  }

//////////////////////////////////////////////   END OF ADD ITEM TO USER LIST  


//////////////////////////////////////////////   CUSTOM ITEM 

  addCustomItem(data){
    console.log(data)
    this.crud.create(this.customItemUrl, {customItemName: data.customItemName, vendorId: data.vendorId})
        .subscribe(result=>{
          if(typeof result == 'number' && result > 0){
            this.userItemsList[data.vendorInd]['items'].push(new Item(data.customItemName, 'cus', result, 'Case'));// add item to userItemsList
            
          }else{
            this.modal.text = "Couldn't add new item";
            this.modal.errDisplay = "block";
          }
        });
  }

//////////////////////////////////////////////   END OF CUSTOM ITEM 


//////////////////////////////////////////////    ITEM'S NOTE 

// open note modal
  noteModal(data){
    console.log(this.userItemsList)
    console.log(data)
    this.modal.noteDisplay = 'block';
    this.note.name = this.userItemsList[data.vendorInd]['items'][data.itemInd]['name'];
    this.note.note = this.userItemsList[data.vendorInd]['items'][data.itemInd]['note'];
    this.note.vendorInd = data.vendorInd;
    this.note.itemInd = data.itemInd;
  }




// save item note

  saveNote(){
    let itemId = this.userItemsList[this.note.vendorInd]['items'][this.note.itemInd]['id'];
      if(this.note.note){
        if(this.userItemsList[this.note.vendorInd]['items'][this.note.itemInd]['note']){
          this.crud.update(this.itemNoteUrl, {itemId: itemId, note: this.note.note})
              .subscribe(result=>{
                if(result === 1){
                  this.userItemsList[this.note.vendorInd]['items'][this.note.itemInd]['note'] = this.note.note;
                }else{
                  this.modal.text = "Couldn't update item note";
                  this.modal.errDisplay = "block";
                }
              })
        }else{
          this.crud.create(this.itemNoteUrl, {itemId: itemId, note: this.note.note})
          .subscribe(result=>{
            if(result === 1){
              this.userItemsList[this.note.vendorInd]['items'][this.note.itemInd]['note'] = this.note.note;
            }else{
              this.modal.text = "Couldn't add new note for item";
              this.modal.errDisplay = "block";
            }
          })
        }
      }else{
        this.crud.delete(this.itemNoteUrl, {itemId: itemId, note: this.note.note})
        .subscribe(result=>{
          if(result === 1){
            this.userItemsList[this.note.vendorInd]['items'][this.note.itemInd]['note'] = this.note.note;
          }else{
            this.modal.text = "Couldn't remove note";
            this.modal.errDisplay = "block";
          }
        })
      }
  }
/////////////////////////////////////   END OF ITEM'S NOTE 
}
