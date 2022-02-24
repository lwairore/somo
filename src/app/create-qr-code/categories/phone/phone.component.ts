import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertItemToString } from '@sharedModule/utils';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

const WINDOW_NAVIGATOR = window.navigator as any;

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneComponent implements OnInit, OnDestroy {
  phoneDetailsFormGroup: FormGroup | undefined;

  isSubmitted = false;

  readonly ELEMENT_TYPE = NgxQrcodeElementTypes.URL;

  readonly CORRECTION_LEVEL = NgxQrcodeErrorCorrectionLevels.HIGH;

  showQrCode = false;

  valueForQrCode = '';

  private _downloadQrCodeImageURLs: string[] = [];


  constructor(
    private _formBuilder: FormBuilder,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnDestroy() {
    this._revokeDownloadQrCodeImageURLs();
  }

  ngOnInit() {
    this._initializePhoneDetailsFormGroup();
  }

  private _revokeDownloadQrCodeImageURLs() {
    this._downloadQrCodeImageURLs.forEach(url =>
      URL.revokeObjectURL(url));
  }

  private _initializePhoneDetailsFormGroup() {
    this.phoneDetailsFormGroup = this._formBuilder.group({
      phoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[+\d()./N,*;#]{1,20}$/)
      ])],
    }, { updateOn: 'blur' });
  }

  submitForm() {
    this.isSubmitted = true;
    const phoneNumber = convertItemToString(
      this.phoneDetailsFormGroup?.get('phoneNumber')?.value)?.trim();

    if (this.phoneDetailsFormGroup?.invalid) {
      console.log('Please provide all the required values!')
      return;
    }

    this.valueForQrCode = 'tel:' + phoneNumber;

    this.showQrCode = true;
  }

  showHiddenPhoneDetailsForm() {
    this.valueForQrCode = '';
    this.showQrCode = false;
  }

  downloadQRCode() {
    this._revokeDownloadQrCodeImageURLs();
    const fileNameToDownload = 'created_phone_qr_code';

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
