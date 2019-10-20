import { CourseBase } from './CourseBase';
import { CoursePic } from './CoursePic';
import { TeachPlanNode } from './TeachPlanNode';

export class CourseView {
  courseBase: CourseBase;
  coursePic: CoursePic;
  teachplanNode: TeachPlanNode;

  constructor() {
    this.courseBase = new CourseBase();
    this.coursePic = new CoursePic();
    this.teachplanNode = new TeachPlanNode();
  }
}
