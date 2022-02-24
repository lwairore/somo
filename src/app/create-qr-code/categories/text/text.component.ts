import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertItemToString, stringIsEmpty } from '@sharedModule/utils';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

const WINDOW_NAVIGATOR = window.navigator as any;

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnInit, OnDestroy {
  textFormGroup: FormGroup | undefined;

  isSubmitted = false;

  valueForQrCode = '';

  showQrCode = false;

  readonly ELEMENT_TYPE = NgxQrcodeElementTypes.URL;

  readonly CORRECTION_LEVEL = NgxQrcodeErrorCorrectionLevels.HIGH;


  private _downloadQrCodeImageURLs: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit(): void {
    this._initializeTextFormGroup();
  }

  ngOnDestroy(): void {
    this._revokeDownloadQrCodeImageURLs();
  }

  private _initializeTextFormGroup() {
    this.textFormGroup = this._formBuilder.group({
      text: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(300)
      ])]
    }, { updateOn: 'blur' });
  }

  showHiddenCreateTextQrCodeForm() {
    this.valueForQrCode = '';

    this.showQrCode = false;
  }

  private _revokeDownloadQrCodeImageURLs() {
    this._downloadQrCodeImageURLs.forEach(url =>
      URL.revokeObjectURL(url));
  }

  submitForm() {
    this.isSubmitted = true;

    const textValue = convertItemToString(
      this.textFormGroup?.get('text')?.value?.trim());

    if (this.textFormGroup?.invalid || stringIsEmpty(textValue)) {
      return;
    }

    this.valueForQrCode = textValue;

    this.showQrCode = true;
  }

  downloadQRCode() {
    this._revokeDownloadQrCodeImageURLs();
    const fileNameToDownload = 'created_text_qr_code';

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
