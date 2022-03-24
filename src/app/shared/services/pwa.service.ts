import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;

  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      window.location.reload();
    });

    this.setUpEvents();
  }

  setUpEvents() {
    window.addEventListener('beforeinstallprompt', event => {
      console.log('beforeinstallprompt Event fired');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.

      this.promptEvent = event;
    });

    window.addEventListener('appinstalled', event => {
      this.promptEvent = undefined;
    });
  }
}
