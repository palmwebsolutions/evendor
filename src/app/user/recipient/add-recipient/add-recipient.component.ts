import { Component, OnInit } from '@angular/core';

import { vendorService } from '../../shared/vendorService';
import { Vendor } from '../../shared/vendor';

@Component({
  selector: 'add-recipient',
  templateUrl: './add-recipient.component.html',
  styleUrls: ['./add-recipient.component.css']
})
export class AddRecipientComponent implements OnInit {

  public vendors: Vendor[];

  constructor(private service: vendorService) { }

  ngOnInit() {
    this.service.getVendors().then(result=>this.vendors = result);
  }

}
