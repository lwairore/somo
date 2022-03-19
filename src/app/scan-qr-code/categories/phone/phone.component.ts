import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhoneDetails } from '@sharedModule/models';
import { stringContainsALink } from '@sharedModule/utils';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneComponent implements OnInit {
  @Input() telScanResult: PhoneDetails = { phone: '' };
  @Output() scanAgain = new EventEmitter<boolean>();
  contentContainsURL = stringContainsALink;

  showCopiedToClipboardFeedback: boolean | null = null;


  constructor(private clipboard: Clipboard) { }

  ngOnInit(): void {
  }

  resetScanner(): void {
    this.scanAgain.emit(true);
  }

  sendSMSLink(): string {
    let parameters = 'sms:';

    if (this.telScanResult.phone) {
      parameters += this.telScanResult.phone;
    }

    return parameters;
  }

  callLink(): string {
    let parameters = 'tel:';

    if (this.telScanResult.phone) {
      parameters += this.telScanResult.phone;
    }

    return parameters;

  }

  constructTelText(): string {
    let text = '';

    if (this.telScanResult.phone) {
      text = 'Call or send SMS to ' + this.telScanResult.phone;
    }

    return text;
  }

  copyToClipboard() {
    this.clipboard.copy(this.telScanResult.phone ?? '');
    this.showCopiedToClipboardFeedback = true;

    setTimeout(() => {
      this.showCopiedToClipboardFeedback = null;
    }, 5000);

  }

}
