import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { FileUpload } from './file-upload.model';
import { isObject } from 'util';

@Injectable()
export class FileUploadService {

  files;
  accept;
  maxSize;
  previewUrl: SafeUrl;
  action: string = '';
  // action: string = 'http://localhost:30101/api/filesystem/upload';

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  startUpload(event) {
    // const files = event.dataTransfer
    //   ? event.dataTransfer.files
    //   : event.target.files;

    // for (const file of files) {
    //   if (this.isImage(file)) {
    //     this.previewUrl = this.createURL(file);
    //   }

    //   return this.upload(file);
    // }
  }

  upload(event, uploadFile, name, action, data = {}, afterUpload: EventEmitter<{}>) {
    const url = action || this.action;

    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;


    const formData = new FormData();

    for (const file of files) {
      formData.append(name || 'multipartFile', file, file.name);
      Object.keys(data).forEach((item) => {
        if (isObject(data[item])) {
          formData.append(item , JSON.stringify(data[item]));
        } else {
          formData.append(item , data[item]);
        }
      });
      if (uploadFile.readyState === 'DONE') {
        this.http.post(url, formData).subscribe(res => {
          if (afterUpload) {
            afterUpload.emit({uploadFile, res});
          }
        });
      }
    }


    // formData.append(file.name, file, file.name);
    // return this.http.post(url, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    // });
    // return this.http.request(new HttpRequest('POST', url, formData));
    // return this.http.request(new HttpRequest('POST', url, formData));
  }

  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }

  private createURL(file: any): SafeUrl {
    const url = window.URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private createDataURL(file) {
    const fr = new FileReader();
    fr.readAsDataURL(file);
  }
}
