import { Component, Input, OnInit } from '@angular/core';

const shareOnButtons = [
  {
    name: 'whatsapp',
    hint: 'Share on WhatsApp',
    fullName: 'WhatsApp'
  },
  {
    name: 'telegram',
    hint: 'Share on Telegram',
    fullName: 'Telegram'
  },
  {
    name: 'sms',
    hint: 'Share link via SMS',
    fullName: 'SMS'
  },
  {
    name: 'email',
    hint: 'Share link via email',
    fullName: 'Email'
  },
  // {
  //   name: 'print',
  //   hint: 'Print page',
  //   fullName: 'Print'
  // },
  // {
  //   name: 'copy',
  //   hint: 'Copy link',
  //   fullName: 'Copy'
  // },
  {
    name: 'messenger',
    hint: 'Share on Messenger',
    fullName: 'Messenger'
  },
  {
    name: 'facebook',
    hint: 'Share on Facebook',
    fullName: 'Facebook'
  },
  {
    name: 'twitter',
    hint: 'Share on Twitter',
    fullName: 'Twitter'
  },
  {
    name: 'linkedin',
    hint: 'Share on LinkedIn',
    fullName: 'LinkedIn'
  },
  {
    name: 'tumblr',
    hint: 'Share on Tumblr',
    fullName: 'Tumblr'
  },
  {
    name: 'mix',
    hint: 'Share on Mix',
    fullName: 'Mix'
  },
  {
    name: 'pinterest',
    hint: 'Share on Pinterest',
    fullName: 'Pinterest'
  },
  {
    name: 'reddit',
    hint: 'Share on Reddit',
    fullName: 'Reddit'
  },
  {
    name: 'viber',
    hint: 'Share on Viber',
    fullName: 'Viber'
  },
  {
    name: 'vk',
    hint: 'Share on VKontakte',
    fullName: 'VKontakte'
  },
  {
    name: 'xing',
    hint: 'Share on Xing',
    fullName: 'Xing'
  },
  {
    name: 'line',
    hint: 'Share on Line',
    fullName: 'Line'
  }
];

@Component({
  selector: 'app-social-share-cta',
  templateUrl: './social-share-cta.component.html',
  styles: [
  ]
})
export class SocialShareCtaComponent implements OnInit {
  shareOnButtons = shareOnButtons;

  @Input() title: string | null = null;
  @Input() text: string | null = null;
  @Input() url: string | null = null;
  @Input() description: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
