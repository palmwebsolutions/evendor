import { Component, OnInit } from '@angular/core';


import { vendorService } from '../shared/vendorService';
import { CRUD } from '../shared/crud';
import { Vendor } from '../shared/vendor';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vendors: Vendor[];
  
  public modal = {errDisplay:'none', noteDisplay: 'none', text: ""};
  private vendorUrl = "http://localhost/evendorAPI/vendor.php";
  
    
    constructor(private crud: CRUD) { }
    ngOnInit() {
      this.getVendors();
  }

  getVendors(){
    this.crud.read(this.vendorUrl, '')
      .subscribe(
        result=>{
          this.vendors = result;
        }
      )
  };

  addVendor(vendorName: string){
    console.log(vendorName)
    this.crud.create(this.vendorUrl, {name: vendorName})
    .subscribe(
      result=>{
        if(result === 1){
          this.getVendors();
        }else{
          this.modal.text = "Couldn't add vendor";
          this.modal.errDisplay = "block";
        }
      }
    );
  }

  removeVendor(id: number, index: number){
    this.crud.delete(this.vendorUrl, {id: id})
    .subscribe(
      result=>{
        if(result === 1){
          this.vendors.splice(index, 1);
        }else{
          this.modal.text = "Couldn't remove vendor";
          this.modal.errDisplay = "block";
        }
      }
    );
    
  }

  updateVendor(data){
    this.crud.update(this.vendorUrl, {id: data.id, name: data.name})
    .subscribe(
      result=>{
        if(result !== 1){
          this.getVendors();
          this.modal.text = "Couldn't remove vendor";
          this.modal.errDisplay = "block";
        }
      }
    );
   }
}
