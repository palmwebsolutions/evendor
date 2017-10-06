import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css'],
  inputs: ['newItemsList']
})
export class NewListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selected(vendor, option){
    console.log(vendor, option)
    if(vendor == option){
      return true
    }else{
      return false
    }
  }
}
