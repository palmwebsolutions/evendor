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

  @Output()
  remove: EventEmitter<number> = new EventEmitter();

  removeVendor(id){
    this.remove.emit(id);
  }

  @Output()
  save: EventEmitter<object> = new EventEmitter();

  saveVendor(){
    this.save.emit({name: this.vendor.name, id: this.vendor.id});
    this.editVendor = false;
  }
}
