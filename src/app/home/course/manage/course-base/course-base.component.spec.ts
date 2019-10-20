import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBaseComponent } from './course-base.component';

describe('CourseBaseComponent', () => {
  let component: CourseBaseComponent;
  let fixture: ComponentFixture<CourseBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
