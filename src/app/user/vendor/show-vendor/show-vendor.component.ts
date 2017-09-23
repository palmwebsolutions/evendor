import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { vendorService } from '../../shared/vendorService';
import { Vendor } from '../../shared/vendor';


@Component({
  selector: 'show-vendor',
  templateUrl: './show-vendor.component.html',
  styleUrls: ['./show-vendor.component.css'],
  inputs: ['vendor']
})
export class ShowVendorComponent implements OnInit {
  public showAddVendor: boolean;
  constructor(private service: vendorService) { }

  ngOnInit() {
  }

  @Output()
  remove: EventEmitter<object> = new EventEmitter();

  removeVendor(vendor: Vendor){
    this.remove.emit(vendor);
    console.log(vendor)
  }
}
