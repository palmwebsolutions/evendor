export class Item{
    constructor(
        public name: string,
        public family: string,
        public id: number,
        public pack: string,
        public group?: number,
        public note?: string,
        public type?: string
    ){}
}