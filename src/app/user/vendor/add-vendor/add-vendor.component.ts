import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css'],
  inputs: ['vendorName']
})
export class AddVendorComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  
  public vendorName: string;

  @Output()
  add: EventEmitter<string> = new EventEmitter();
  
  addVendor(){
    this.add.emit(this.vendorName);
    this.vendorName = "";
  }
  
}
