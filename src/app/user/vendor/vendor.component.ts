import { Component, OnInit } from '@angular/core';


import { vendorService } from '../shared/vendorService';
import { Vendor } from '../shared/vendor';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vendors: Vendor[];
  
  constructor(private service: vendorService) { }

  ngOnInit() {
    this.service.getVendors().then(result=>this.vendors = result);
  }

  addVendor(vendorName: string){
    this.service.setVendors(vendorName);
  }

  removeVendor(index: number){
    if(index > -1){
      this.vendors.splice(index, 1);
      //save to Db
    }
  }

  saveVendor(index: number){
    if(index > -1){
      console.log(this.vendors[index]);
      console.log(index);
      //save to Db
    }
  }
}
