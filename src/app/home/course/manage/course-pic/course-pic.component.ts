import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ManageService } from '../manage.service';
import { FileUpload } from '@lib/file-upload';
import { build } from 'src/app/share/util';


declare var toastr: any;

@Component({
  selector: 'app-course-pic',
  templateUrl: './course-pic.component.html',
  styleUrls: ['./course-pic.component.scss']
})
export class CoursePicComponent implements OnInit {
  private files = [];

  constructor(private manageService: ManageService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    // // 统一接口/api/course/view获取课程数据
    // this.service.findCoursPic('4028e581617f945f01617f9dabc40000').subscribe((res: any) => {
    //   if (res.flag === 0 && res.data) {
    //     this.files = [res.data];
    //     // toastr.success(res.message);
    //   }
    //   // else {
    //   //   toastr.error(res.message);
    //   // }
    // });
    this.loadData();
  }
  loadData(): any {
    this.manageService.dataStore.subscribe(res => {
      if (res.coursePic && res.coursePic.pic) {
        const fileUpload = FileUpload.BuildFromFile({
          source: `${this.manageService.filesystemDomain}/${res.coursePic.pic}`
        } as any);
        this.files = [fileUpload];
      }
    });
  }

  onUpload(e: FileUpload[]) {
    //
  }

  onAfterUpload(e: any) {
    const data = e.res.data;
    this.manageService.saveCoursePic(this.manageService.courseId, data.fileId).subscribe((res: any) => {
      if (this.files[0]) {
        this.files[0].src = `${this.manageService.filesystemDomain}/${data.filePath}`;
      } else {
        this.files.push(e.uploadFile);
      }
    });
  }

  onRemove(data) {
    this.manageService.delCoursePic(this.manageService.courseId).subscribe((res: any) => {
      this.files[0] = [];
      // this.changeDetectorRef.markForCheck();
      // this.changeDetectorRef.detectChanges();
    });
  }

}
