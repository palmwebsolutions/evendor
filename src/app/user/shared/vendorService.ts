import { Injectable } from "@angular/core";

import { Vendor } from './vendor';

let vendors = [
    new Vendor("Roma", 1),
    new Vendor("CBI", 2),
    new Vendor("Sysco", 3),
    new Vendor("De Martino", 4)
]

let vendorsPromise = Promise.resolve(vendors);


@Injectable()

export class vendorService{
    getVendors(): Promise<Vendor[]>{
        return vendorsPromise;
    }

    setVendors(newVendor){
        vendors.push(new Vendor(newVendor, 5));
    }

   

}

