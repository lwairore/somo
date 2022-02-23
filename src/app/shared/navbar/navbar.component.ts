import { Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  navItems = Immutable.fromJS([
    {
      href: '/create',
      textContent: 'Create QR Code'
    },
    {
      href: '/create',
      textContent: 'Scan QR Code'
    },
    {
      href: '/contact-us',
      textContent: 'Contact Us'
    },
    {
      href: '/about-us',
      textContent: 'About Us'
    },
  ]);

  constructor() { }

  ngOnInit(): void {
  }

}
