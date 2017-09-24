import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'show-vendor',
  templateUrl: './show-vendor.component.html',
  styleUrls: ['./show-vendor.component.css'],
  inputs: ['vendor']
})
export class ShowVendorComponent implements OnInit {
  public showAddVendor: boolean;
  constructor() { }

  ngOnInit() {
  }

  public editVendor: boolean = false;

  @Output()
  remove: EventEmitter<object> = new EventEmitter();

  removeVendor(){
    this.remove.emit();
  }

  @Output()
  save: EventEmitter<object> = new EventEmitter();

  saveVendor(){
    this.save.emit();
    this.editVendor = false;
  }
}
