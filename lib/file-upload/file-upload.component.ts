import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  OnInit,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploadService } from './file-upload.service';
import { BehaviorSubject } from 'rxjs';
import { FileUpload } from './file-upload.model';
import { ToasterService } from 'src/app/share/toaster.service';
import { build, equals } from 'src/app/share/util';
import { Ordering } from 'src/app/share/Ordering';

declare var toastr: any;

@Component({
  // moduleId: module.id,
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'app-upload'
  }
})
export class FileUploadComponent implements OnInit, OnChanges {
  // @Input() id = `files-${uuid}`;
  @Input() accept;
  @Input() maxFileSize;
  @Input() action;
  @Input() multiple = false;
  @Input() ordered = true;
  @Input() preview = true;
  @Input() name;
  @Input() data;
  @Input() files: FileUpload[] = [];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onBeforeUpload = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAfterUpload = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onUpload = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  // @Output() onRemove = new EventEmitter();
  @Output() moveUp = new EventEmitter<FileUpload>();
  @Output() moveDown = new EventEmitter<FileUpload>();
  @Output() remove = new EventEmitter<FileUpload>();
  private onModelChange: (val: any) => {};

  changes$: BehaviorSubject<FileUpload> = new BehaviorSubject<FileUpload>(
    new FileUpload()
  );
  value: FileUpload[];
  focused: FileUpload[];
  ordering: Ordering<FileUpload> = new Ordering<FileUpload>([], FileUpload, 'order', 'name');

  constructor(private ref: ChangeDetectorRef, private service: FileUploadService) {}

  get activeFile(): FileUpload {
    return this.hasUploads ? this.files[0] : new FileUpload();
  }

  get hasUploads(): boolean {
    return this.uploads.length > 0;
  }

  get uploads(): FileUpload[] {
    return this.ordering.items.filter(upload => upload.name !== '');
  }

  set uploads(value: FileUpload[]) {
    this.ordering.updateItems(value.filter(upload => upload.name !== ''));
    this.change(this.uploads);
    this.files = this.uploads;
  }


  ngOnInit(): void {
    this.changes$.subscribe(upload => {
      this.upload(upload, upload.event);
    });
  }

  ngOnChanges() {
    if (this.files && this.files.length) {
      this.uploads = this.files;
    }
  }

  onMoveUp(f: FileUpload) {
    this.moveUp.emit(f);
  }

  onMoveDown(f: FileUpload) {
    this.moveDown.emit(f);
  }

  onRemove(f: FileUpload) {
    this.remove.emit(f);
  }

  onInputChange(e: any) {
    const input = event.target;
    const files = (input as any).files;
    if (files && files.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < files.length; i++) {
        this.setupReader(files[i], e);
      }
    }
  }

  setupReader(file: File, event: Event) {
    const reader = new FileReader();
    const changes$ = this.changes$;
    const upload = build(FileUpload, {
      lastModified: file.lastModified,
      // lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type,
    });
    reader.onload = (e: any) => {
      const src = reader.result;
      const readyState = FileUpload.GetReadyState(reader);
      changes$.next(Object.assign(upload, { src, readyState, event }));
    };
    reader.readAsDataURL(file);
    this.upload(build(FileUpload, upload, { readyState: FileUpload.GetReadyState(reader) }), event);
  }

  upload(upload: FileUpload, event) {
    const f = build(FileUpload, upload);
    this.update(f);

    if (this.hasUploads && this.action) {
      this.service.upload(event, upload, this.name, this.action, this.data, this.onAfterUpload);
    }
  }

  update(f: FileUpload) {
    const index = this.uploads.findIndex(item => item.name === f.name);
    if (index === -1) {
      this.add(f);
    } else {
      this.uploads = this.uploads.map((x, i) => i === index ? build(FileUpload, f, { order: x.order }) : x);
      this.ref.detectChanges();
    }
  }

  add(f: FileUpload) {
    if (!this.multiple && this.hasUploads) {
      this.delete();
    }
    this.uploads = this.ordering.addItem(f);
  }

  delete(f?: FileUpload) {
    const removeFile = f || this.activeFile;
    this.uploads = this.ordering.removeItem(removeFile);
  }


  change(value: FileUpload[]) {
    if (!equals(this.value, value)) {
      this.value = value;
      if (value.every(x => x.readyState === 'DONE')) {
        this.emit();
      }
      if (this.onModelChange) {
        this.onModelChange(value);
      }
    }
  }

  emit() {
    if (this.value.length > 0) {
      if (this.multiple) {
        this.onUpload.emit(this.value);
      } else {
        this.onUpload.emit(this.value[0]);
      }
    }
  }

}
