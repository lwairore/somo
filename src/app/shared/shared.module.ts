import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FormatUrlPipe } from './pipes/format-url.pipe';
import { DynamicallySetHeightUsingScrollHeightDirective } from './directives/dynamically-set-height-using-scroll-height.directive';
import { InputPatternEnforcerDirective } from './directives/input-pattern-enforcer.directive';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent,
    FormatUrlPipe,
    DynamicallySetHeightUsingScrollHeightDirective,
    InputPatternEnforcerDirective,
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
    DynamicallySetHeightUsingScrollHeightDirective,
    InputPatternEnforcerDirective,
  ]
})
export class SharedModule { }
