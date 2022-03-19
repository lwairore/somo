import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQrCodeRoutingModule } from './create-qr-code-routing.module';
import { CreateQrCodeComponent } from './create-qr-code.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from './categories/text/text.component';
import { WifiComponent } from './categories/wifi/wifi.component';
import { UrlComponent } from './categories/url/url.component';
import { SmsComponent } from './categories/sms/sms.component';
import { PhoneComponent } from './categories/phone/phone.component';
import { GeoComponent } from './categories/geo/geo.component';
import { EmailComponent } from './categories/email/email.component';
import { ContactComponent } from './categories/contact/contact.component';


@NgModule({
  declarations: [
    CreateQrCodeComponent,
    CategoryComponent,
    UrlComponent,
    TextComponent,
    WifiComponent,
    SmsComponent,
    PhoneComponent,
    GeoComponent,
    EmailComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CreateQrCodeRoutingModule,
    SharedModule,
    NgxQRCodeModule,
  ]
})
export class CreateQrCodeModule { }
