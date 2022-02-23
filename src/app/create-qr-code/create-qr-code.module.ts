import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateQrCodeRoutingModule } from './create-qr-code-routing.module';
import { CreateQrCodeComponent } from './create-qr-code.component';


@NgModule({
  declarations: [CreateQrCodeComponent],
  imports: [
    CommonModule,
    CreateQrCodeRoutingModule
  ]
})
export class CreateQrCodeModule { }
