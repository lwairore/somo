import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';

const WINDOW_NAVIGATOR = window.navigator as any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  navItems = Immutable.fromJS([
    {
      href: '/create',
      textContent: 'Create QR Code',
      show: true
    },
    {
      href: '/create',
      textContent: 'Scan QR Code',
      show: true
    },
    {
      href: '/contact-us',
      textContent: 'Contact Us',
      show: true
    },
    {
      href: '/about-us',
      textContent: 'About Us',
      show: true
    },
    {
      href: '/install-app',
      textContent: 'Install App',
      show: !this.isInstalled
    },
  ]);

  constructor() { }

  ngOnInit(): void {
  }

  get isInstalled() {
    // For iOS
    if (WINDOW_NAVIGATOR.standalone) return true

    // For Android
    if (window.matchMedia('(display-mode: standalone)').matches) return true

    // If neither is true, it's not installed
    return false
  }

}
