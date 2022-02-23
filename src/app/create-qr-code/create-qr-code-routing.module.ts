import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateQrCodeComponent } from './create-qr-code.component';


const routes: Routes = [
  {
    path: '',
    component: CreateQrCodeComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateQrCodeRoutingModule { }
