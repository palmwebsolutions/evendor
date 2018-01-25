import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'show-vendor',
  templateUrl: './show-vendor.component.html',
  styleUrls: ['./show-vendor.component.css'],
  inputs: ['vendor']
})
export class ShowVendorComponent implements OnInit {

  public vendor;
  
  constructor() { }

  ngOnInit() {
  }

  public editVendor: boolean = false;
  public vendorName: string = '';

  @Output()
  remove: EventEmitter<object> = new EventEmitter();

  removeVendor(id, name){
    this.remove.emit({id: id, name: name});
  }

  @Output()
  save: EventEmitter<object> = new EventEmitter();

  saveVendor(){
    this.vendor.name = this.vendorName
    this.save.emit({name: this.vendor.name, id: this.vendor.id});
    this.editVendor = false;
  }

  edit(name){
    this.editVendor = true;
    this.vendorName = name;
  }

  cancel(){
    this.editVendor = false;
    this.vendorName = '';
  }
}
