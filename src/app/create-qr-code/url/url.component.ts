import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styles: [
  ]
})
export class UrlComponent implements OnInit, OnDestroy {
  websiteAddressFormGroup: FormGroup | undefined;

  isSubmitted = false;

  valueForQrCode = '';

  readonly ELEMENT_TYPE = NgxQrcodeElementTypes.URL;

  readonly CORRECTION_LEVEL = NgxQrcodeErrorCorrectionLevels.HIGH;

  showQrCode = false;

  private _downloadQrCodeImageURLs: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._revokeDownloadQrCodeImageURLs();
   }

}
