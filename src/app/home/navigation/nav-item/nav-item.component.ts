import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  // 解决item样式错位问题
  encapsulation: ViewEncapsulation.None
})
export class NavItemComponent implements OnInit {
  @Input()
  item: any;

  constructor() { }

  ngOnInit() {
  }

}
