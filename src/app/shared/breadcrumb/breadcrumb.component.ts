import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbItems = Immutable.fromJS([]);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  manuallyTriggerChangeDetection() {
    this._changeDetectorRef.detectChanges();
  }
}
