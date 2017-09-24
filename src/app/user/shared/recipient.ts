import { Vendor } from './vendor';

export class Recipient{
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public vendor: Vendor[], 
        private id: number
    ){}
}