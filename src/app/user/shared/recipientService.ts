import { Injectable } from '@angular/core';

import { Recipient } from './recipient';
import { Vendor } from './vendor';

/* let recipients = [
    new Recipient('Kip', 'kip@gmail.com', '(561)2341234', [{name: 'CBI', id: 2}], 1),
    new Recipient('Doug', 'doug@roma.com', '(216)1234561', [{name: 'Roma', id: 1}], 2),
    new Recipient('Steve', 'steve@sysco.com', '', [{name: 'Sysco', id: 3}], 3),
    new Recipient('Bahti', 'bahti@gmail.com', '', [{name: 'demartino', id: 4},{name: 'CBI', id: 2},{name: 'Roma', id: 1},{name: 'Sysco', id: 3}], 4),
    new Recipient('Carl', 'carl@demartino.com', '(561)2622275', [{name: 'de Martino', id: 4}], 5)
] */

let recipients = [
    new Recipient('Kip', 'kip@gmail.com', '(561)2341234', [new Vendor('CBI', 2)], 1)

]



let recipientPromise = Promise.resolve(recipients)

@Injectable()
export class RecipientService{
    getRecipients(): Promise<Recipient[]>{
        return recipientPromise
    }

}