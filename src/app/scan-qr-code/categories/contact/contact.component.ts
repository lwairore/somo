import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { constructGoogleMapsSearchAPI } from '@sharedModule/google-maps-apis';
import { MecardDetails } from '@sharedModule/models';
import { stringContainsALink } from '@sharedModule/utils';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  @Input() mecardScanResult: MecardDetails = { fullName: '' };

  @Output() scanAgain = new EventEmitter<boolean>();

  contentContainsURL = stringContainsALink;

  constructGoogleMapsSearchAPI = constructGoogleMapsSearchAPI;

  showCopiedToClipboardFeedback: boolean | null = null;

  constructor(
    private clipboard: Clipboard) { }

  ngOnInit(): void {
  }

  resetScanner(): void {
    this.scanAgain.emit(true);
  }

  sendEmailLink(): string {
    let parameters = 'mailto:';

    if (this.mecardScanResult.email) {
      parameters += this.mecardScanResult.email;
    }

    return parameters;

  }

  sendSMSLink(): string {
    let parameters = 'sms:';

    if (this.mecardScanResult.phone) {
      parameters += this.mecardScanResult.phone;
    }

    return parameters;

  }

  callLink(): string {
    let parameters = 'tel:';

    if (this.mecardScanResult.phone) {
      parameters += this.mecardScanResult.phone;
    }

    return parameters;

  }

  constructMecardText(): string {
    let text = '';

    if (this.mecardScanResult.fullName) {
      text += this.mecardScanResult.fullName + '\n';
    }

    if (this.mecardScanResult.organization) {
      text += this.mecardScanResult.organization + '\n';
    }

    if (this.mecardScanResult.address) {
      text += this.mecardScanResult.address + '\n';
    }

    if (this.mecardScanResult.phone) {
      text += this.mecardScanResult.phone + '\n';
    }

    if (this.mecardScanResult.email) {
      text += this.mecardScanResult.email + '\n';
    }

    if (this.mecardScanResult.notes) {
      text += this.mecardScanResult.notes + '\n';
    }

    return text;
  }

  copyToClipboard() {
    const text = this.constructMecardText();

    this.clipboard.copy(text);
    this.showCopiedToClipboardFeedback = true;

    setTimeout(() => {
      this.showCopiedToClipboardFeedback = null;
    }, 5000);

  }
}
