import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertItemToString, encodeStringToUri, stringIsEmpty } from '@sharedModule/utils';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

const WINDOW_NAVIGATOR = window.navigator as any;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsComponent implements OnInit, OnDestroy {
  smsDetailsFormGroup: FormGroup | undefined;

  isSubmitted = false;

  readonly ELEMENT_TYPE = NgxQrcodeElementTypes.URL;

  readonly CORRECTION_LEVEL = NgxQrcodeErrorCorrectionLevels.HIGH;

  showQrCode = false;

  valueForQrCode = '';

  private _downloadQrCodeImageURLs: string[] = [];

  PHONE_REG_STR = /^[+\d()./N,*;#]{0,20}$/

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnDestroy() {
    this._revokeDownloadQrCodeImageURLs();
  }

  ngOnInit() {
    this._initializeSmsDetailsFormGroup();
  }

  private _revokeDownloadQrCodeImageURLs() {
    this._downloadQrCodeImageURLs.forEach(url =>
      URL.revokeObjectURL(url));
  }

  private _initializeSmsDetailsFormGroup() {
    this.smsDetailsFormGroup = this._formBuilder.group({
      phoneNumber: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.pattern(/^[+\d()./N,*;#]{0,20}$/)
      ])],
      message: ['', Validators.maxLength(120)]
    }, { updateOn: 'blur' });
  }

  showHiddenCreateSmsQrCodeForm() {
    this.valueForQrCode = '';

    this.showQrCode = false;
  }

  submitForm() {
    this.isSubmitted = true;

    const phoneNumber = convertItemToString(
      this.smsDetailsFormGroup?.get('phoneNumber')?.value)
      .trim();

    const message = convertItemToString(this.smsDetailsFormGroup?.value?.message)
      .trim();

    if (this.smsDetailsFormGroup?.invalid) {
      console.log('Please provide all the required values!')
      return;
    }

    let smsDetails = 'sms:' + phoneNumber;


    if (!stringIsEmpty(message)) {
      const messageEnc = encodeStringToUri(message);

      smsDetails += '?body=' + messageEnc;
    }

    this.valueForQrCode = smsDetails;

    this.showQrCode = true;
  }

  downloadQRCode() {
    this._revokeDownloadQrCodeImageURLs();
    const fileNameToDownload = 'created_sms_qr_code';

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
