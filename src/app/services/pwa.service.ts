import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;

  constructor(private swUpdate: SwUpdate) {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });

    window.addEventListener('appinstalled', event => {
      this.promptEvent = undefined;
    });

    swUpdate.available.subscribe(event => {
      window.location.reload();
    });
  }
}
