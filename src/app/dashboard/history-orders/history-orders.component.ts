import { Component, Input, OnInit } from '@angular/core';
import { HistoryModel } from '../shared/histor-model';

@Component({
  selector: 'qa-history-orders',
  templateUrl: './history-orders.component.html',
  styleUrls: ['./history-orders.component.scss']
})
export class HistoryOrdersComponent implements OnInit {
  @Input() public historyList: HistoryModel[];
  constructor() { }

  ngOnInit() {
  }

}
