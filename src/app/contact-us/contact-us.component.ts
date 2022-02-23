import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as Immutable from 'immutable';
import { SeoSocialShareService } from 'ngx-seo';
import { environment } from 'src/environments/environment';
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

  constructor(
    private _seoSocialShareService: SeoSocialShareService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._setupBreadcrumbDetails();

    this._setupSEODetails();
  }

  private _setupSEODetails() {
    this._seoSocialShareService.setData({
      title: 'Contact Us | Somo',
      description: 'Have a question?  Contact us 24 hours a day 7 days a week for the best customer service!',
      keywords: 'customer service, technical assistance',
    });
  }

  private _setupBreadcrumbDetails() {
    if (this._breadcrumbCmp instanceof BreadcrumbComponent) {
      this._breadcrumbCmp.breadcrumbItems = Immutable.fromJS([
        {
          textContent: 'Contact Us',
          isActive: true
        },
      ]);

      if (!this._breadcrumbCmp.breadcrumbItems.isEmpty()) {
        this._breadcrumbCmp.manuallyTriggerChangeDetection();
      }
    }
  }

}
