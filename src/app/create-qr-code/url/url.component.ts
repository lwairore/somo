import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styles: [
  ]
})
export class UrlComponent implements OnInit {
  websiteAddressFormGroup: FormGroup | undefined;

  isSubmitted = false;

  valueForQrCode = '';

  constructor() { }

  ngOnInit(): void {
  }

}
