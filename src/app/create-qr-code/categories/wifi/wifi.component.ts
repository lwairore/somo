import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertItemToString, getBoolean, stringIsEmpty } from '@sharedModule/utils';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import * as Immutable from 'immutable';
import { ShouldPasswordBeProvidedAsWifiDetail } from '../../validators';

const WINDOW_NAVIGATOR = window.navigator as any;

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styles: [
  ]
})
export class WifiComponent implements OnInit, OnDestroy {
  wifiFormGroup: FormGroup | undefined;

  encryptionOptions = Immutable.fromJS([
    { fullName: 'No password set', nickName: 'nopass' },
    { fullName: 'WPA/WPA2', nickName: 'wpa' },
    { fullName: 'WEP', nickName: 'wep' }
  ]);

  valueForQrCode = '';

  isSubmitted = false;

  showQrCode = false;

  private _downloadQrCodeImageURLs: string[] = [];

  readonly ELEMENT_TYPE = NgxQrcodeElementTypes.URL;

  readonly CORRECTION_LEVEL = NgxQrcodeErrorCorrectionLevels.HIGH;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(DOCUMENT) private _document: Document,) { }

  ngOnInit() {
    this._initializeWifiFormGroup();

    this._revokeDownloadQrCodeImageURLs();
  }

  ngOnDestroy() {
    this._revokeDownloadQrCodeImageURLs();
  }

  private _revokeDownloadQrCodeImageURLs() {
    this._downloadQrCodeImageURLs.forEach(url =>
      URL.revokeObjectURL(url));
  }

  private _initializeWifiFormGroup() {
    this.wifiFormGroup = this._formBuilder.group({
      ssideOrNetworkName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(32)
      ])],
      encryption: ['wpa', Validators.compose([
        Validators.required,
        Validators.maxLength(15),

      ])],
      password: [''],
      hidden: [false]
    }, {
      updateOn: 'blur',
      validators: ShouldPasswordBeProvidedAsWifiDetail
        .shouldPasswordBeProvidedAsWifiDetail(
          'encryption', ['wep', 'wpa'], 'password')
    });
  }

  submitForm() {
    this.isSubmitted = true;
    const ssideOrNetworkName = convertItemToString(this.wifiFormGroup
      ?.get('ssideOrNetworkName')?.value)?.trim();

    if (this.wifiFormGroup?.invalid || stringIsEmpty(ssideOrNetworkName)) {
      return;
    }

    const selectedEncryptionType = convertItemToString(
      this.wifiFormGroup
        ?.get('encryption')?.value)?.trim()?.toUpperCase();

    const choosenPassword = (selectedEncryptionType !== 'nopass') ? convertItemToString(
      this.wifiFormGroup?.get('password')?.value?.trim()) : '';

    const wifiIsHidden = getBoolean(this.wifiFormGroup?.get('hidden')?.value);

    const formatQrValue = 'WIFI:S:' +
      ssideOrNetworkName + ';' +
      'T:' + selectedEncryptionType + ';' +
      'P:' + choosenPassword + ';' +
      'H:' + wifiIsHidden + ';;';


    this.valueForQrCode = formatQrValue;

    this.showQrCode = true;
  }

  downloadQRCode() {
    this._revokeDownloadQrCodeImageURLs();
    const fileNameToDownload = 'created_wifi_qr_code';

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

  showHiddenCreateWifiQrCodeForm() {
    this.valueForQrCode = '';

    this.showQrCode = false;
  }

}
