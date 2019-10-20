import { Injectable, EventEmitter } from '@angular/core';
import { NavigationModel } from './navigation-model';
import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class NavigationService {
  navigationModel: NavigationModel;
  onNavigationModelChange: BehaviorSubject<any> = new BehaviorSubject({});
  onNavigationCollapseToggle = new EventEmitter<any>();
  onNavigationCollapseToggled = new EventEmitter<any>();

  constructor() {
    this.navigationModel = new NavigationModel();
    this.onNavigationModelChange.next(this.navigationModel.model);
  }
}
