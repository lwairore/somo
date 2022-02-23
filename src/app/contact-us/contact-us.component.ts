import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as Immutable from 'immutable';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styles: [
  ]
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  @ViewChild(BreadcrumbComponent)
  private _breadcrumbCmp: BreadcrumbComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { }

  private _setupBreadcrumbDetails() {
    if (this._breadcrumbCmp instanceof BreadcrumbComponent) {
      this._breadcrumbCmp.breadcrumbItems = Immutable.fromJS([
        {
          textContent: 'Contact Us',
          isActive: false
        },
      ])
    }
  }

}
