import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { FileUploadService } from './file-upload.service';
import { FileUploadComponent } from './file-upload.component';
import {
  FileUploadDirective,
  FileUploadDropDirective
} from './file-upload.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilePreviewComponent } from './file-preview/file-preview.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  declarations: [
    FileUploadDirective,
    FileUploadDropDirective,
    FileUploadComponent,
    FilePreviewComponent
  ],
  exports: [FileUploadDirective, FileUploadDropDirective, FileUploadComponent],
  providers: [FileUploadService]
})
export class FileUploadModule {}
