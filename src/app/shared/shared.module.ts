import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FormatUrlPipe } from './pipes/format-url.pipe';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent,
    FormatUrlPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent,
    FormatUrlPipe,
  ]
})
export class SharedModule { }
