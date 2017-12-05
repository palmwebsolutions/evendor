import { Component, OnInit } from '@angular/core';


import { CRUD } from '../shared/crud';
import { Vendor } from '../shared/vendor';
import { modal } from '../shared/modal';


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  
  public vendors: Vendor[];
  public modal = modal;
  private vendorUrl = "http://localhost/evendorAPI/vendor.php";
  private userListUrl = "http://localhost/evendorAPI/userlist.php";
  
    
    constructor(private crud: CRUD) { }
    ngOnInit() {
      this.getVendors();
  }

  getVendors(){
    this.crud.read(this.vendorUrl, '')
      .subscribe(
        result=>{
          this.vendors = result;
        },
        error=>{
          if(error.status == 0){
            console.log('no internet connection')
          }else{
            console.log("Something went wrong")
          }
          
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
    this.crud.read(this.userListUrl, {vendorId: id})
    .subscribe(result=>{
      if(result[0] > 0){
        this.modal.text = "Can't remove vendor because there are one or more assigned items to this vendor";
        this.modal.errDisplay = "block";
      }else{
        this.crud.delete(this.vendorUrl, {id: id})
        .subscribe(result=>{
            if(result === 1){
              this.vendors.splice(index, 1);
            }else{
              this.modal.text = "Couldn't remove vendor";
              this.modal.errDisplay = "block";
            }
          }
        );
      }
    });
    
    
    
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
