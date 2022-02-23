import { Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbItems = Immutable.fromJS([]);

  constructor() { }

  ngOnInit(): void {
  }

}
