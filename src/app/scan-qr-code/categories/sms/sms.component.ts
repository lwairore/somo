import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SmsDetails } from '@sharedModule/models';
import { encodeStringToUri, stringContainsALink } from '@sharedModule/utils';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsComponent implements OnInit {
  @Input() smsScanResult: SmsDetails = {};
  @Output() scanAgain = new EventEmitter<boolean>();
  contentContainsURL = stringContainsALink;

  showCopiedToClipboardFeedback: boolean | null = null;

  constructor(private clipboard: Clipboard) { }

  ngOnInit(): void {
  }

  resetScanner(): void {
    this.scanAgain.emit(true);
  }

  shareTitle(): string {
    let title = '';

    if (this.smsScanResult.phone) {
      title += 'Send a new message: ';
      title += this.smsScanResult.phone;
    }
    else {
      title += 'Send a new message';
    }

    return title;
  }


  sendSMSLink(): string {
    let parameters = 'sms:';

    if (this.smsScanResult.phone) {
      parameters += this.smsScanResult.phone;
    }

    if (this.smsScanResult.message) {
      const messageEncoded = encodeStringToUri(this.smsScanResult.message);
      parameters += '?body=' + messageEncoded;
    }

    return parameters;
  }

  constructSMSText(): string {
    let text = '';

    if (this.smsScanResult.phone) {
      text += this.smsScanResult.phone + '\n';
    }

    if (this.smsScanResult.message) {
      text += this.smsScanResult.message + '\n';
    }

    return text;
  }

  copyToClipboard() {
    const text = this.constructSMSText();

    this.clipboard.copy(text);
    this.showCopiedToClipboardFeedback = true;

    setTimeout(() => {
      this.showCopiedToClipboardFeedback = null;
    }, 5000);

  }

}
