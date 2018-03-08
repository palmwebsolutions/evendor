export class Order{
    constructor(
        public i: number, //item id
        public v: number, //vendor.id
        public p: string, // packaging
        public q: number, //quantity
        public n?: string //vendor name
    ){}
}