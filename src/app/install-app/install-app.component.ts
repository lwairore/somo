import { Platform } from '@angular/cdk/platform';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PwaService } from '../services/pwa.service';

@Component({
  selector: 'app-install-app',
  templateUrl: './install-app.component.html',
  styles: [
  ]
})
export class InstallAppComponent implements OnInit, OnDestroy {
  isIos = false;

  constructor(
    private platform: Platform,
    public pwaService: PwaService
  ) {
    this.isIos = platform.IOS;
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  installPwa(): void {
    this.pwaService.promptEvent.prompt();
  }

}
