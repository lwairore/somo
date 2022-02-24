import { Component, OnInit } from '@angular/core';

type EncryptionOption = {
  fullName: string;
  nickName: string;
};

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styles: [
  ]
})
export class WifiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
