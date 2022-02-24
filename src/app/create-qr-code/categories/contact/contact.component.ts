import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertItemToString, stringIsEmpty } from '@sharedModule/utils';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

const WINDOW_NAVIGATOR = window.navigator as any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit, OnDestroy {
  mecardFormGroup: FormGroup | undefined;

  valueForQrCode = '';

  showQrCode = false;

  isSubmitted = false;

  private _downloadQrCodeImageURLs: string[] = [];

  readonly ELEMENT_TYPE = NgxQrcodeElementTypes.URL;

  readonly CORRECTION_LEVEL = NgxQrcodeErrorCorrectionLevels.HIGH;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(DOCUMENT) private _document: Document,) { }

  ngOnDestroy() {
    this._revokeDownloadQrCodeImageURLs();
  }

  ngOnInit() {
    this._initializeMecardFormGroup();
  }

  private _revokeDownloadQrCodeImageURLs() {
    this._downloadQrCodeImageURLs.forEach(url =>
      URL.revokeObjectURL(url));
  }

  private _initializeMecardFormGroup() {
    this.mecardFormGroup = this._formBuilder.group({
      fullName: ['', Validators.compose([
        Validators.maxLength(64),
        Validators.minLength(1),
        Validators.required
      ])],
      organization: ['', Validators.maxLength(64)],
      address: ['', Validators.maxLength(64)],
      email: ['', Validators.email],
      phone: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.pattern(/^[+\d()./N,*;#]{0,20}$/)
      ])],
      notes: ['', Validators.maxLength(300)]
    }, { updateOn: 'blur' });
  }

  submitForm() {
    this.isSubmitted = true;
    const fullName = this.mecardFormGroup?.get('fullName')?.value?.trim();

    if (this.mecardFormGroup?.invalid || stringIsEmpty(fullName)) {
      return;
    }

    let formatQrValue = 'MECARD:' +
      'N:' + fullName + ';';


    const organization = convertItemToString(
      this.mecardFormGroup
        ?.get('organization')?.value)?.trim()?.toUpperCase();
    if (!stringIsEmpty(organization)) {
      formatQrValue += 'ORG:' + organization + ';';
    }

    const address = convertItemToString(
      this.mecardFormGroup
        ?.get('address')?.value)?.trim();
    if (!stringIsEmpty(address)) {
      formatQrValue += 'ADR:' + address + ';';
    }

    const phone = convertItemToString(
      this.mecardFormGroup
        ?.get('phone')?.value)?.trim();
    if (!stringIsEmpty(phone)) {
      formatQrValue += 'TEL:' + phone + ';';
    }

    const email = convertItemToString(
      this.mecardFormGroup
        ?.get('email')?.value)?.trim();
    if (!stringIsEmpty(email)) {
      formatQrValue += 'EMAIL:' + email + ';';
    }

    const notes = convertItemToString(
      this.mecardFormGroup
        ?.get('notes')?.value)?.trim();
    if (!stringIsEmpty(notes)) {
      formatQrValue += 'NOTE:' + notes + ';';
    }

    formatQrValue += ';'

    this.valueForQrCode = formatQrValue;

    this.showQrCode = true;
  }

  downloadQRCode() {
    this._revokeDownloadQrCodeImageURLs();
    const fileNameToDownload = 'created_mecard_qr_code';

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

  showHiddenCreateContactQrCodeForm() {
    this.valueForQrCode = '';

    this.showQrCode = false;
  }


}
