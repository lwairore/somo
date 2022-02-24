import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CreateQrCodeComponent } from './create-qr-code.component';
import { TextComponent } from './categories/text/text.component';
import { WifiComponent } from './categories/wifi/wifi.component';
import { UrlComponent } from './categories/url/url.component';
import { SmsComponent } from './categories/sms/sms.component';
import { PhoneComponent } from './categories/phone/phone.component';
import { GeoComponent } from './categories/geo/geo.component';
import { EmailComponent } from './categories/email/email.component';


const routes: Routes = [
  {
    path: '',
    component: CreateQrCodeComponent,
    children: [
      {
        path: '',
        component: CategoryComponent,
      },
      {
        path: 'email',
        component: EmailComponent,
      },
      {
        path: 'url',
        component: UrlComponent,
      },
      {
        path: 'text',
        component: TextComponent,
      },
      {
        path: 'wifi',
        component: WifiComponent,
      },
      {
        path: 'sms',
        component: SmsComponent,
      },
      {
        path: 'phone',
        component: PhoneComponent,
      },
      {
        path: 'geo',
        component: GeoComponent,
      },
      {
        path: '**',
        component: CategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateQrCodeRoutingModule { }
