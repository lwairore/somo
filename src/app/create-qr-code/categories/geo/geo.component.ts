import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertItemToString, stringIsEmpty } from '@sharedModule/utils';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

const WINDOW_NAVIGATOR = window.navigator as any;

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoComponent implements OnInit, OnDestroy {
  geoDetailsFormGroup: FormGroup | undefined;

  isSubmitted = false;

  readonly ELEMENT_TYPE = NgxQrcodeElementTypes.URL;

  readonly CORRECTION_LEVEL = NgxQrcodeErrorCorrectionLevels.HIGH;

  showQrCode = false;

  valueForQrCode = '';

  private _downloadQrCodeImageURLs: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(DOCUMENT) private _document: Document,) { }

  ngOnDestroy() {
    this._revokeDownloadQrCodeImageURLs();
  }

  ngOnInit() {
    this._initializeGeoDetailsFormGroup();
  }

  private _revokeDownloadQrCodeImageURLs() {
    this._downloadQrCodeImageURLs.forEach(url =>
      URL.revokeObjectURL(url));
  }

  private _initializeGeoDetailsFormGroup() {
    this.geoDetailsFormGroup = this._formBuilder.group({
      latitude: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[+\d-.]+$/)])
      ],
      longitude: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[+\d-.]+$/)])
      ],
      query: ['', Validators.maxLength(60)]
    }, { updateOn: 'blur' });
  }

  submitForm() {
    this.isSubmitted = true;

    const latitude = this.geoDetailsFormGroup?.value?.latitude;

    const longitude = this.geoDetailsFormGroup?.value?.longitude;

    if (this.geoDetailsFormGroup?.invalid) {
      console.log('Please provide all the required values!')
      return;
    }

    let geoDetails = 'geo:' +
      latitude + ',' + longitude;

    const query = convertItemToString(
      this.geoDetailsFormGroup?.value?.query).trim();
    if (!stringIsEmpty(query)) {
      geoDetails += '?q=' + query;
    }

    this.valueForQrCode = geoDetails;

    this.showQrCode = true;
  }

  downloadQRCode() {
    this._revokeDownloadQrCodeImageURLs();
    const fileNameToDownload = 'created_geo_qr_code';

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

  showHiddenGeoDetailsForm() {
    this.valueForQrCode = '';

    this.showQrCode = false;
  }
}
