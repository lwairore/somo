import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-qr-code',
  templateUrl: './create-qr-code.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateQrCodeComponent implements OnInit, OnDestroy {
  private _routerEventsSubscription: Subscription | undefined;

  showBackButton = false;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._determineIfShowBackButtonShouldBeShown();
  }

  ngOnDestroy(): void { }

  private _unsubscribeRouterEventsSubscription() {
    if (this._routerEventsSubscription instanceof Subscription) {
      this._routerEventsSubscription.unsubscribe();
    }
  }

  private _resetShowBackButton() {
    if (this.showBackButton) {
      this.showBackButton = false;
    }
  }


  private _determineIfShowBackButtonShouldBeShown() {
    this._routerEventsSubscription = this._router.events
      .subscribe((event: NavigationEvent) => {
        switch (true) {
          case event instanceof NavigationEnd:
            this._resetShowBackButton();

            const currentURL = (event as NavigationEnd)?.url;

            console.log("currentURL")
            console.log(currentURL)

            if (
              currentURL.startsWith('/qr-code/create/url') ||
              currentURL.startsWith('/qr-code/create/text') ||
              currentURL.startsWith('/qr-code/create/contact') ||
              currentURL.startsWith('/qr-code/create/email') ||
              currentURL.startsWith('/qr-code/create/sms') ||
              currentURL.startsWith('/qr-code/create/geo') ||
              currentURL.startsWith('/qr-code/create/phone') ||
              currentURL.startsWith('/qr-code/create/wifi')) {
              this.showBackButton = true;
            } else {
              this.showBackButton = false;
            }
            break;

          default:
            break;
        }
      })
  }
}
