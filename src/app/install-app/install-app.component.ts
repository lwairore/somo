import { Platform } from '@angular/cdk/platform';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-install-app',
  templateUrl: './install-app.component.html',
  styles: [
  ]
})
export class InstallAppComponent implements OnInit, OnDestroy {
  private _appinstalledUnlistener: (() => void) | undefined;
  private _beforeinstallpromptUnlistener: (() => void) | undefined;

  promptEvent: any;

  platformType = '';

  constructor(
    private _renderer2: Renderer2,
    private platform: Platform,
  ) { }

  ngOnInit(): void {
    this._initPwaPrompt();
  }

  ngOnDestroy(): void {
    if (this._appinstalledUnlistener) {
      this._appinstalledUnlistener();
    }

    if (this._beforeinstallpromptUnlistener) {
      this._beforeinstallpromptUnlistener();
    }
  }

  private _initPwaPrompt() {
    if (this.platform.IOS) {
      this.platformType = 'ios';
      const navigator = window.navigator as any;
      const isInStandaloneMode = ('standalone' in navigator) && (navigator.standalone);
      // if (!isInStandaloneMode) {
      //   this.promptEvent = event;
      // } else {
      // }
      this._beforeinstallpromptUnlistener = this._renderer2
        .listen('window', 'beforeinstallprompt', (event) => this.promptEvent = event);
    } else {

      this._beforeinstallpromptUnlistener = this._renderer2
        .listen('window', 'beforeinstallprompt', (event) => this.promptEvent = event);
    }

    this._appinstalledUnlistener = this._renderer2
      .listen('window', 'appinstalled', (event) => this.promptEvent = undefined);
  }


  installPwa(): void {
    this.promptEvent?.prompt();
  }

}
