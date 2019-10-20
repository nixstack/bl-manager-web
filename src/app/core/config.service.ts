import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ConfigService {

  settings: any;
  defaultSettings: any;
  onSettingsChanged: BehaviorSubject<any>;

  constructor() {
    this.defaultSettings = {
      colorClasses: {
        header: 'app-background-white',
        footer: 'app-background-blue',
        brand: 'app-background-blue',
        navigation: 'app-background-dark'
      },
      layout: {
        mode: 'fullwidth',
        navigation: 'left',
        header: 'below',
        footer: 'below'
      }
    };

    this.settings = Object.assign({}, this.defaultSettings);
    this.onSettingsChanged = new BehaviorSubject(this.settings);
  }

  setSettings(setting) {
    console.log('---------- class ConfigService ----------');
    console.log(setting);
    console.log('---------- class ConfigService ----------');
    this.settings = Object.assign({}, this.settings, setting);
    this.onSettingsChanged.next(this.settings);
  }
}
