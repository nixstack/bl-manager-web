import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDeleteComponent } from './site-delete.component';

describe('SiteDeleteComponent', () => {
  let component: SiteDeleteComponent;
  let fixture: ComponentFixture<SiteDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
