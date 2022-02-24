import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanQrCodeRoutingModule } from './scan-qr-code-routing.module';
import { ScanQrCodeComponent } from './scan-qr-code.component';
import { ScanOrUploadComponent } from './scan-or-upload/scan-or-upload.component';


@NgModule({
  declarations: [ScanQrCodeComponent, ScanOrUploadComponent],
  imports: [
    CommonModule,
    ScanQrCodeRoutingModule
  ]
})
export class ScanQrCodeModule { }
