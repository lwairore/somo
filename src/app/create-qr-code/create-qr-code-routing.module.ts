import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CreateQrCodeComponent } from './create-qr-code.component';


const routes: Routes = [
  {
    path: '',
    component: CreateQrCodeComponent,
    children: [
      {
        path: '',
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
