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

  ngOnDestroy(): void {
    this._unsubscribeRouterEventsSubscription();
   }

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
    console.log("_determineIfShowBackButtonShouldBeShown")
    this._routerEventsSubscription = this._router.events
      .subscribe((event: NavigationEvent) => {
        console.log("(event as NavigationEnd)?.url")
        switch (true) {
          case event instanceof NavigationEnd:
            this._resetShowBackButton();

            const currentURL = (event as NavigationEnd)?.url;

            console.log("currentURL")
            console.log(currentURL)

            if (
              currentURL.startsWith('/create/url') ||
              currentURL.startsWith('/create/text') ||
              currentURL.startsWith('/create/contact') ||
              currentURL.startsWith('/create/email') ||
              currentURL.startsWith('/create/sms') ||
              currentURL.startsWith('/create/geo') ||
              currentURL.startsWith('/create/phone') ||
              currentURL.startsWith('/create/wifi')) {
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
