import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlComponent implements OnInit {
  @Input() urlScanResult: {
    href?: string,
    domain?: string
  } = {};

  @Output() scanAgain = new EventEmitter<boolean>();

  showCopiedToClipboardFeedback: boolean | null = null;

  constructor(
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
  }

  resetScanner(): void {
    this.scanAgain.emit(true);
  }

  copyToClipboard() {
    this.clipboard.copy(this.urlScanResult?.href ?? '');

    this.showCopiedToClipboardFeedback = true;

    setTimeout(() => {
      this.showCopiedToClipboardFeedback = null;
    }, 5000);

  }

}
