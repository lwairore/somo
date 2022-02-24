import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { UrlValidator } from '../validators/url.validator';

const WINDOW_NAVIGATOR = window.navigator as any;

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

  showHiddenCreateUrlQrCodeForm() {
    this.valueForQrCode = '';

    this.showQrCode = false;
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

  downloadQRCode() {
    this._revokeDownloadQrCodeImageURLs();
    const fileNameToDownload = 'created_url_qr_code';

    const coolQRCodeElement = this._document.getElementsByClassName('coolQRCode');
    if (!coolQRCodeElement.length) { return; }

    const coolQRCodeElementChildren = coolQRCodeElement[0].children;
    if (!coolQRCodeElementChildren.length) { return; }

    const base64Img = (coolQRCodeElementChildren[0] as HTMLImageElement)['src'];
    fetch(base64Img)
      .then(res => res.blob())
      .then((blob) => {
        // IE
        if (WINDOW_NAVIGATOR && WINDOW_NAVIGATOR.msSaveOrOpenBlob) {
          WINDOW_NAVIGATOR.msSaveOrOpenBlob(blob, fileNameToDownload);
        } else { // Chrome
          const url = window.URL.createObjectURL(blob);
          this._downloadQrCodeImageURLs.push(url);
          const link = this._document.createElement('a');
          link.href = url;
          link.download = fileNameToDownload;
          link.click();
        }
      })
  }
}
