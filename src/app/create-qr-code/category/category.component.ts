import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
  categories = Immutable.fromJS([
    {
      textContent: 'URL',
      featherIcon: 'link',
      href: '/create/url'
    },
    {
      textContent: 'Text',
      featherIcon: 'type',
      href: '/create/text'
    },
    {
      textContent: 'Contact',
      featherIcon: 'user',
      href: '/create/contact'
    },
    {
      textContent: 'Email',
      featherIcon: 'mail',
      href: '/create/email'
    },
    {
      textContent: 'SMS',
      featherIcon: 'message-square',
      href: '/create/sms'
    },
    {
      textContent: 'Geo',
      featherIcon: 'fe-map-pin',
      href: '/create/geo'
    },
    {
      textContent: 'Phone',
      featherIcon: 'phone',
      href: '/create/phone'
    },
    {
      textContent: 'Wifi',
      featherIcon: 'wifi',
      href: '/create/wifi'
    },
  ])

  constructor() { }

  ngOnInit(): void {
  }

}
