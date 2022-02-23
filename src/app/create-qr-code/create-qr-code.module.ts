import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQrCodeRoutingModule } from './create-qr-code-routing.module';
import { CreateQrCodeComponent } from './create-qr-code.component';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    CreateQrCodeComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CreateQrCodeRoutingModule
  ]
})
export class CreateQrCodeModule { }
