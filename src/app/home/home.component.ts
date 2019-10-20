import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../core/config.service';
import { NavigationService } from './navigation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  settings: any;
  onSettingsChanged: Subscription;
  layoutMode: boolean = false;

  navigationModel: any;
  navigationModelChangeSubscription: Subscription;

  sidenavOpen: boolean = true;
  sidenavMode: string = 'side';
  sidenavAlign: string = 'start';
  customizerSidenavAlign: string = 'end';

  constructor(
    // private mediaObserver: MediaObserver,
    private config: ConfigService,
    // private translateService: TranslateService,
    // private translationService: TranslationService,
    private navigationService: NavigationService
  ) {
    this.navigationModelChangeSubscription = this.navigationService.onNavigationModelChange.subscribe(
      navigation => {
        this.navigationModel = navigation;
      }
    );

    this.onSettingsChanged = this.config.onSettingsChanged.subscribe(
      settings => {
        this.settings = settings;

        if (this.settings.layout.mode === 'boxed') {
          this.layoutMode = true;
        } else {
          this.layoutMode = false;
        }

        if (this.settings.layout.navigation === 'left') {
          this.sidenavAlign = 'start';
          this.customizerSidenavAlign = 'end';
        } else if (this.settings.layout.navigation === 'right') {
          this.sidenavAlign = 'end';
          this.customizerSidenavAlign = 'start';
        } else {
          this.sidenavAlign = 'start';
          this.customizerSidenavAlign = 'end';
          this.sidenavOpen = false;
        }
      }
    );
  }

  ngOnInit() {
    // this.mediaObserver.media$.subscribe(change => {
    //   const isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    //   this.sidenavMode = isMobile ? 'over' : 'side';
    //   this.sidenavOpen = !isMobile;
    // });
  }

  ngOnDestroy() {
    this.navigationModelChangeSubscription.unsubscribe();
  }

  /**
   * @param event 事件
   * @param scrollContainer 容器dom
   */
  onActivate(event, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  onSettingsChange(settings) {
    // this.config.setSettings(settings);
  }

}
