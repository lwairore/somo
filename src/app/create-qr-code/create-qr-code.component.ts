import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-qr-code',
  templateUrl: './create-qr-code.component.html',
  styles: [
  ]
})
export class CreateQrCodeComponent implements OnInit {
  private _routerEventsSubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
