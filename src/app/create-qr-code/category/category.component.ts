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
      href: '/create/url',
      helpText: 'Opens the URL after scanning'
    },
    {
      textContent: 'Text',
      featherIcon: 'type',
      href: '/create/text',
      helpText: 'Displays a plain text'
    },
    {
      textContent: 'Contact',
      featherIcon: 'user',
      href: '/create/contact',
      helpText: 'Saves contact details on the smartphone',
    },
    {
      textContent: 'Email',
      featherIcon: 'mail',
      href: '/create/email',
      helpText: 'Sends an email with a predefined text',
    },
    {
      textContent: 'SMS',
      featherIcon: 'message-square',
      href: '/create/sms',
      helpText: 'Sends an SMS with a predefined text',
    },
    {
      textContent: 'Geo',
      featherIcon: 'map-pin',
      href: '/create/geo',
      helpText: 'Opens the location of something on a map',
    },
    {
      textContent: 'Phone',
      featherIcon: 'phone',
      href: '/create/phone',
      helpText: 'Calls a given phone number',
    },
    {
      textContent: 'Wifi',
      featherIcon: 'wifi',
      href: '/create/wifi',
      helpText: 'Show the credentials for a WiFi network',
    },
  ])

  constructor() { }

  ngOnInit(): void {
  }

}
