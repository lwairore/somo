import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQrCodeRoutingModule } from './create-qr-code-routing.module';
import { CreateQrCodeComponent } from './create-qr-code.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { UrlComponent } from './url/url.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateQrCodeComponent,
    CategoryComponent,
    UrlComponent
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
