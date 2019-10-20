import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { PageService } from './page.service';
import { PageAddComponent } from './dialog/page-add/page-add.component';
import { PageEditComponent } from './dialog/page-edit/page-edit.component';
import { PageDeleteComponent } from './dialog/page-delete/page-delete.component';
import { LinkComponent } from './dialog/page-link/page-link.component';

export interface PeriodicElement {
  // serialNumber: string;
  pageName: string;
  pageAliase: string;
  pageType: string;
  pageWebPath: string;
  pagePhysicalPath: string;
  pageCreateTime: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    // 'serialNumber',
    'pageName',
    'pageAliase',
    'pageType',
    'pageWebPath',
    'pagePhysicalPath',
    'pageCreateTime',
    'actions'
  ];
  dataSource: any;
  totalPage: number;

  exampleDatabase: PageService | null;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  siteName: string;
  pageAliase: string;

  // 站点列表
  siteList = [
    {
      siteId: '5a751fab6abb5044e0d19ea1',
      siteName: '门户主站'
    },
    {
      siteId: '102',
      siteName: '测试站'
    }
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private service: PageService) { }

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;

    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.service.select(this.sort.active, this.sort.direction, this.paginator.pageIndex);
    //     }),
    //     map(data => {
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = false;
    //       this.resultsLength = 100;

    //       return data;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = true;
    //       return observableOf([]);
    //     })
    //   )
    //   .subscribe(data => (this.data = data));

    this.service.find().subscribe(res => {
      if (res.data.list.length) {
        this.dataSource = new MatTableDataSource<PeriodicElement>(res.data.list);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPage = res.data.total;
      }
    });

  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  onPageChange($event: PageEvent): void {
    // if (this.dataSource.data.length < this.totalPage && $event.pageIndex > $event.previousPageIndex) {
    //   this.service.find($event.pageIndex + 1, $event.pageSize).subscribe(res => {
    //     if (res.data.list.length) {
    //       this.dataSource = new MatTableDataSource<PeriodicElement>([...this.dataSource.data, ...res.data.list]);
    //       // this.dataSource.sort = this.sort;
    //       // this.dataSource.paginator = this.paginator;
    //       // this.totalPage = res.data.total;
    //     }
    //   });
    // }

    this.service.find($event.pageIndex + 1, $event.pageSize).subscribe(res => {
      if (res.data.list.length) {
        this.dataSource = new MatTableDataSource<PeriodicElement>(res.data.list);
        // this.dataSource.data = res.data.list;
      }
    });
  }

  onSendTriggered() {
    // if (this.newMessage) {
    //   let chat = {
    //     message: this.newMessage,
    //     when: new Date(),
    //     who: 'me'
    //   };

    //   this.activeChat.messages.push(chat);
    //   this.onSendChat.emit(this.activeChat);
    //   this.newMessage = '';
    // }
    this.service.find(1, 10, {siteId: this.siteName, pageAliase: this.pageAliase}).subscribe(res => {
      if (res.data.list.length) {
        this.dataSource = new MatTableDataSource<PeriodicElement>(res.data.list);
        this.totalPage = res.data.total;
      }
    });
  }

  onAdd(periodicElement: PeriodicElement) {
    const dialogRef = this.dialog.open(PageAddComponent, {
      data: {periodicElement}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        if (this.dataSource.data.length < this.paginator.pageSize) {
          this.dataSource = new MatTableDataSource<PeriodicElement>([...this.dataSource.data, this.service.getDialogData()]);
        }
        this.totalPage++;
        this.refreshTable();
        // this.exampleDatabase.dataChange.value.push(this.service.getDialogData());
      }
    });
  }

  onEdit(i, data) {
    const dialogRef = this.dialog.open(PageEditComponent, {
      data: Object.assign({}, data)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.dataSource.data.findIndex(x => x.pageId === data.pageId);
        this.dataSource.data[foundIndex] = this.service.getDialogData();
        this.refreshTable();
      }
    });
  }

  onDelete(i, data) {
    const dialogRef = this.dialog.open(PageDeleteComponent, {
      data: Object.assign({}, data)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.dataSource.data.findIndex(x => x.pageId === data.pageId);
        this.dataSource.data.splice(foundIndex, 1);

        if (this.dataSource.data.length === 0) {
          this.totalPage--;
          this.paginator.pageIndex--;
        }
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  onLink(pageId) {
    this.dialog.open(LinkComponent, {
      data: {pageId}
    });
  }

  onPreview(pageId) {
    window.open(`http://localhost:31301/cms/page/preview/${pageId}`);
  }

  onPublish(pageId) {
    this.service.publish(pageId);
  }

}
