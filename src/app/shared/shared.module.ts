import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent,
  ]
})
export class SharedModule { }
