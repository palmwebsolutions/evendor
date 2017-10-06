import { Component, OnInit } from '@angular/core';

import { ItemService } from '../shared/itemService';
import { vendorService } from '../shared/vendorService'; 

import { Item } from '../shared/item';
import { Vendor } from '../shared/vendor';
import { family } from '../shared/family';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  
  public family = family;
  public allItems: any[] = [];
  public vendors: Vendor[];
  public newItemsList = [];
  
  constructor(private itemService: ItemService, private vendorService: vendorService) { }
  ngOnInit() {
    
    this.vendorService.getVendors()
        .then(vendors=>{
          this.vendors = vendors; 
          return vendors
        })
        .then(vendors=>{
          for(var i = 0; i < vendors.length; i++){
            this.newItemsList.push({name: vendors[i]['name'], id: vendors[i]['id'], items: []})
          };
        });

    for(var i = 0; i < this.family.length; i++){
      this.allItems.push({name: this.family[i]['name'], id: this.family[i]['id'], items: []});
      this.allItems[i]['received'] = false;//true when received items from DB.  To avoid double request from DB, when all items will be moved to newList
    }
    
  }
    
  

  getItems(familyId, index){  // function to get items(product) by family, on click 
    this.itemService.getItems(familyId)
    .subscribe(
      result=>{
        this.allItems[index]['items'] = result;
        this.allItems[index]['received'] = true;
      }
    );
  }

  getFamilyItems(data){//click emit to get items by family
    if(this.allItems[data.index]['items'].length == 0 && this.allItems[data.index]['received'] == false){
      this.getItems(data.familyId, data.index);
    }
    
  }

  addToList(data){// adding items to new items list
    this.newItemsList[data.vendorInd]['items'].push(this.allItems[data.familyInd]['items'][data.itemInd]);
    this.newItemsList[data.vendorInd]['familyInd'] = data.familyInd; //familyInd will be used to remove item from newItemsList and push back to allItems
    this.allItems[data.familyInd]['items'].splice(data.itemInd, 1)//remove item from allItems to avoid double items in newItemsList
  }

}
