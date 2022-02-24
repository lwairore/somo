import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQrCodeRoutingModule } from './create-qr-code-routing.module';
import { CreateQrCodeComponent } from './create-qr-code.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { UrlComponent } from './url/url.component';


@NgModule({
  declarations: [
    CreateQrCodeComponent,
    CategoryComponent,
    UrlComponent
  ],
  imports: [
    CommonModule,
    CreateQrCodeRoutingModule,
    SharedModule,
  ]
})
export class CreateQrCodeModule { }
