import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QR_CODE_CATEGORIES } from '@sharedModule/consts';
import { EmailDetails, GeoDetails, PhoneDetails, SmsDetails, WifiDetails } from '@sharedModule/models';
import { QrHistoryService } from '@sharedModule/services';
import { parseQrCodeValue } from '@sharedModule/utils';

@Component({
  selector: 'app-value-of-scanned',
  templateUrl: './value-of-scanned.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueOfScannedComponent implements OnInit {
  @Input('qrCodeResult')
  set qrCodeResult(value: any) {
    this.formatScanResult(value);
  }

  formattedQrCodeScanResult: any;

  @Output() scanAgain = new EventEmitter<boolean>();

  smsQrCodeCategory = QR_CODE_CATEGORIES.SMS;
  telQrCodeCategory = QR_CODE_CATEGORIES.TEL;
  mecardQrCodeCategory = QR_CODE_CATEGORIES.MECARD;
  urlQrCodeCategory = QR_CODE_CATEGORIES.URL;
  wifiQrCodeCategory = QR_CODE_CATEGORIES.WIFI;
  emailQrCodeCategory = QR_CODE_CATEGORIES.EMAIL;
  geoQrCodeCategory = QR_CODE_CATEGORIES.GEO;


  categoryOfQrCode: string | null = null;

  @Input() failedToReadQRCode: boolean | undefined;

  constructor(
    private _qrHistoryService: QrHistoryService
  ) { }

  ngOnInit(): void {
  }

  resetScanner(): void {
    this.scanAgain.emit(true);
  }

  formatScanResult(scanResult: string) {
    console.log({ scanResult })
    const parsedQrCodeValues = parseQrCodeValue(scanResult);

    console.log({ parsedQrCodeValues })

    if (!parsedQrCodeValues) { return; }

    switch (parsedQrCodeValues.qrCategory) {
      case this.smsQrCodeCategory:
        this.formattedQrCodeScanResult = parsedQrCodeValues.result as SmsDetails;
        this.categoryOfQrCode = this.smsQrCodeCategory;

        this._qrHistoryService
          .addScanedSmsToIndexedDb(
            this.formattedQrCodeScanResult);
        break;
      case this.telQrCodeCategory:
        this.formattedQrCodeScanResult = parsedQrCodeValues.result as PhoneDetails;
        this.categoryOfQrCode = this.telQrCodeCategory;

        this._qrHistoryService
          .addScanedPhoneToIndexedDb(
            this.formattedQrCodeScanResult);
        break;
      case this.mecardQrCodeCategory:
        this.formattedQrCodeScanResult = parsedQrCodeValues.result;
        this.categoryOfQrCode = this.mecardQrCodeCategory;

        this._qrHistoryService
          .addScanedMecardToIndexedDb(
            this.formattedQrCodeScanResult);
        break;
      case this.wifiQrCodeCategory:
        this.formattedQrCodeScanResult = parsedQrCodeValues.result as WifiDetails;
        this.categoryOfQrCode = this.wifiQrCodeCategory;

        this._qrHistoryService
          .addScanedWifiToIndexedDb(
            this.formattedQrCodeScanResult);
        break;
      case this.emailQrCodeCategory:
        this.formattedQrCodeScanResult = parsedQrCodeValues.result as EmailDetails;
        this.categoryOfQrCode = this.emailQrCodeCategory;

        this._qrHistoryService
          .addScanedEmailToIndexedDb(
            this.formattedQrCodeScanResult);
        break;
      case this.geoQrCodeCategory:
        this.formattedQrCodeScanResult = parsedQrCodeValues.result as GeoDetails;
        this.categoryOfQrCode = this.geoQrCodeCategory;

        this._qrHistoryService
          .addScanedGeoToIndexedDb(
            this.formattedQrCodeScanResult);
        break;
      case this.urlQrCodeCategory:
        this.formattedQrCodeScanResult = parsedQrCodeValues.result;
        this.categoryOfQrCode = this.urlQrCodeCategory;

        this._qrHistoryService
          .addScanedUrlToIndexedDb({
            href: this.formattedQrCodeScanResult?.href,
            domain: this.formattedQrCodeScanResult?.domain
          });
        break;
      default:
        this.formattedQrCodeScanResult = scanResult;

        this._qrHistoryService
          .addScanedMessageToIndexedDb(
            this.formattedQrCodeScanResult);
        break;
    }
  }

}
