export class Item{
    constructor(
        public name: string,
        public family: string,
        public id: number,
        public type?: string,
        public note?: string
    ){}
}