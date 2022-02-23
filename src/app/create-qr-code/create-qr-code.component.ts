import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-qr-code',
  templateUrl: './create-qr-code.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateQrCodeComponent implements OnInit {
  private _routerEventsSubscription: Subscription | undefined;

  showBackButton = false;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

}
