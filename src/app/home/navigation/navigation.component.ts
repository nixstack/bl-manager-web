import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  // 组件属性声明
  @Input() navigationModel: any[];

  constructor() { }

  ngOnInit() {
  }

}
