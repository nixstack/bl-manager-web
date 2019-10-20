import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePicComponent } from './course-pic.component';

describe('CoursePicComponent', () => {
  let component: CoursePicComponent;
  let fixture: ComponentFixture<CoursePicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
