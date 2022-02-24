import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { UrlValidator } from '../validators/url.validator';

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
    this._initializeWebsiteAddressFormGroup();
  }

  ngOnDestroy(): void {
    this._revokeDownloadQrCodeImageURLs();
  }

  private _revokeDownloadQrCodeImageURLs() {
    this._downloadQrCodeImageURLs.forEach(url =>
      URL.revokeObjectURL(url));
  }

  private _initializeWebsiteAddressFormGroup() {
    this.websiteAddressFormGroup = this._formBuilder.group({
      url: ['', Validators.compose([
        Validators.maxLength(2083),
        Validators.required,
        UrlValidator.invalidUrl
      ])]
    }, { updateOn: 'blur' });
  }

  submitForm() {
    if (!this.isSubmitted) {
      this.isSubmitted = true;
    }

    if (this.websiteAddressFormGroup?.invalid) {
      return;
    }

    this.valueForQrCode = this.websiteAddressFormGroup
      ?.get('url')?.value?.trim();

    this.showQrCode = true;
  }
}
