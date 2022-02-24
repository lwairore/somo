import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CreateQrCodeComponent } from './create-qr-code.component';
import { TextComponent } from './text/text.component';
import { UrlComponent } from './url/url.component';


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
        path: 'url',
        component: UrlComponent,
      },
      {
        path: 'text',
        component: TextComponent,
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
