import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanQrCodeComponent } from './scan-qr-code.component';


const routes: Routes = [
  {
    path: '',
    component: ScanQrCodeComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanQrCodeRoutingModule { }
