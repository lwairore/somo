import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanQrCodeRoutingModule } from './scan-qr-code-routing.module';
import { ScanQrCodeComponent } from './scan-qr-code.component';
import { ScanOrUploadComponent } from './scan-or-upload/scan-or-upload.component';
import { ValueOfScannedComponent } from './value-of-scanned/value-of-scanned.component';
import { ContactComponent } from './categories/contact/contact.component';
import { EmailComponent } from './categories/email/email.component';
import { GeoComponent } from './categories/geo/geo.component';
import { PhoneComponent } from './categories/phone/phone.component';
import { SmsComponent } from './categories/sms/sms.component';
import { TextComponent } from './categories/text/text.component';
import { UrlComponent } from './categories/url/url.component';
import { WifiComponent } from './categories/wifi/wifi.component';
import { SharedModule } from '@sharedModule/shared.module';


@NgModule({
  declarations: [
    ScanQrCodeComponent, 
    ScanOrUploadComponent, 
    ValueOfScannedComponent, 
    ContactComponent, 
    EmailComponent, 
    GeoComponent, 
    PhoneComponent, 
    SmsComponent, 
    TextComponent, 
    UrlComponent, 
    WifiComponent],
  imports: [
    CommonModule,
    ScanQrCodeRoutingModule,
    SharedModule,
  ]
})
export class ScanQrCodeModule { }
