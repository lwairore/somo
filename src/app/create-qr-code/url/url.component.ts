import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

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

  readonly ELEMENT_TYPE = NgxQrcodeElementTypes.URL;

  readonly CORRECTION_LEVEL = NgxQrcodeErrorCorrectionLevels.HIGH;

  showQrCode = false;

  constructor() { }

  ngOnInit(): void {
  }

}
