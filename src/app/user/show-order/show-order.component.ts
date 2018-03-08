import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css'],
  inputs: ['order', 'showUpdateButton']
})
export class ShowOrderComponent implements OnInit {

  public order;
  public orderByVendor = { items: [],  note: '',  name: '' };

  constructor() {}

  ngOnInit() {
    this.toggleVendors(0);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.toggleVendors(0);
  }
  toggleVendors(index){
    for(let i=0; i < this.order.length; i++){//active one will display
      if(i == index){
        this.order[i]['active'] = true;
      }else{
        this.order[i]['active'] = false;
      }
    }
    this.orderByVendor.items = this.order[index]['items'];
    this.orderByVendor['note'] = this.order[index]['note'];
    this.orderByVendor['name'] = this.order[index]['name'];
  }

  @Output()
  updateOrder: EventEmitter<any> = new EventEmitter();
  update(){
    this.updateOrder.emit();
  }
}
