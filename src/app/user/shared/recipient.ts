import { Vendor } from './vendor';

export class Recipient{
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public vendors: Vendor[], 
        public id?: number,
        public index?: number
    ){}
}