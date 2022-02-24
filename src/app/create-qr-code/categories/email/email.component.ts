import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { encodeStringToUri, stringIsEmpty } from '@sharedModule/utils';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

const WINDOW_NAVIGATOR = window.navigator as any;

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent implements OnInit, OnDestroy {
  emailDetailsFormGroup: FormGroup | undefined;

  isSubmitted = false;

  valueForQrCode = '';

  readonly ELEMENT_TYPE = NgxQrcodeElementTypes.URL;

  readonly CORRECTION_LEVEL = NgxQrcodeErrorCorrectionLevels.HIGH;

  showQrCode = false;

  private _downloadQrCodeImageURLs: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(DOCUMENT) private _document: Document,) { }

  ngOnDestroy() {
    this._revokeDownloadQrCodeImageURLs();
  }

  ngOnInit() {
    this._initializeEmailDetailsFormGroup();
  }

  private _revokeDownloadQrCodeImageURLs() {
    this._downloadQrCodeImageURLs.forEach(url =>
      URL.revokeObjectURL(url));
  }

  private _initializeEmailDetailsFormGroup() {
    this.emailDetailsFormGroup = this._formBuilder.group({
      mailto: ['', Validators.compose([Validators.required, Validators.email])],
      subject: ['', Validators.maxLength(25)],
      body: ['', Validators.maxLength(200)]
    }, { updateOn: 'blur' });

    // Note: 'subject' set to a 'maxLength' of '25' because
    // maximum characters allowed on 'Android (480 x 320px) landscape'
    // is '46 characters.'.
    // Learn more here => https://www.theorchardagency.com.au/orchard_insights/subject-line-length/

    // Note: 'body' set to a 'maxLength' of '200' is just a random
    // value.
  }

  submitForm() {
    this.isSubmitted = true;

    const mailto = this.emailDetailsFormGroup?.value?.mailto?.trim();

    if (this.emailDetailsFormGroup?.invalid || (stringIsEmpty(mailto))) {
      console.log('Please provide all the required values!')
      return;
    }

    let emailDetails = 'mailto:' + mailto;

    const subject = this.emailDetailsFormGroup?.value?.subject.trim();
    if (!stringIsEmpty(subject)) {
      const uriEncodedSubject = encodeStringToUri(subject);
      emailDetails += '?subject=' + uriEncodedSubject;
    }

    const body = this.emailDetailsFormGroup?.value?.body.trim();
    if (!stringIsEmpty(body)) {
      const uriEncodedBody = encodeStringToUri(body);
      emailDetails += '&body=' + uriEncodedBody;
    }

    this.valueForQrCode = emailDetails;

    this.showQrCode = true;
  }

  showHiddenEmailDetailsForm() {
    this.valueForQrCode = '';

    this.showQrCode = false;
  }

  downloadQRCode() {
    this._revokeDownloadQrCodeImageURLs();
    const fileNameToDownload = 'created_email_qr_code';

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
      });
  }
}
