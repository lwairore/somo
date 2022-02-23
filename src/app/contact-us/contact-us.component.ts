import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styles: [
  ]
})
export class ContactUsComponent implements OnInit {
  @ViewChild(BreadcrumbComponent)
  private _breadcrumbCmp: BreadcrumbComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
