import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module')
      .then(c => c.ContactUsModule),
  },
  {
    path: 'create',
    loadChildren: () => import('./create-qr-code/create-qr-code.module')
      .then(c => c.CreateQrCodeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
