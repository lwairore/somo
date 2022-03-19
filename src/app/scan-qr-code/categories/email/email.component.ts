import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmailDetails } from '@sharedModule/models';
import { encodeStringToUri, stringContainsALink } from '@sharedModule/utils';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent implements OnInit {
  @Input() emailScanResult: EmailDetails = { mailto: '' };
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

    if (this.emailScanResult.mailto) {
      title += 'Send email to: ';
      title += this.emailScanResult.mailto;
    }
    else {
      title += 'Send email';
    }

    return title;
  }

  sendEmailLink(): string {
    let parameters = 'mailto:';

    if (this.emailScanResult.mailto) {
      parameters += this.emailScanResult.mailto;
    }

    if (this.emailScanResult.subject) {
      const encodedSubject = encodeStringToUri(this.emailScanResult.subject);
      parameters += '?subject=' + encodedSubject;
    }

    if (this.emailScanResult.body) {
      const encodedBody = encodeStringToUri(this.emailScanResult.body);
      parameters += '&body=' + encodedBody;
    }

    return parameters;

  }

  constructEmailText(): string {
    let text = '';

    if (this.emailScanResult.mailto) {
      text += this.emailScanResult.mailto + '\n';
    }

    if (this.emailScanResult.subject) {
      text += this.emailScanResult.subject + '\n';
    }

    if (this.emailScanResult.body) {
      text += this.emailScanResult.body + '\n';
    }

    return text;
  }

  copyToClipboard() {
    const text = this.constructEmailText();

    this.clipboard.copy(text);
    this.showCopiedToClipboardFeedback = true;

    setTimeout(() => {
      this.showCopiedToClipboardFeedback = null;
    }, 5000);

  }

}
