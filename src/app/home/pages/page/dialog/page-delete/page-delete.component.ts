import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PeriodicElement } from '../../page.component';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-page-delete',
  templateUrl: './page-delete.component.html',
  styleUrls: ['./page-delete.component.scss']
})
export class PageDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PageDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
              public service: PageService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.service.delete((this.data as any).pageId);
  }

}
