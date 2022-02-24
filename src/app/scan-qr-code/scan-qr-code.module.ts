import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanQrCodeRoutingModule } from './scan-qr-code-routing.module';
import { ScanQrCodeComponent } from './scan-qr-code.component';


@NgModule({
  declarations: [ScanQrCodeComponent],
  imports: [
    CommonModule,
    ScanQrCodeRoutingModule
  ]
})
export class ScanQrCodeModule { }
