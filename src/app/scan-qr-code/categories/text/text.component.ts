import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { stringContainsALink } from '@sharedModule/utils';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnInit {
  contentContainsURL = stringContainsALink;

  @Input() otherScanResult: any;

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
    this.clipboard.copy(this.otherScanResult ?? '');
    this.showCopiedToClipboardFeedback = true;

    setTimeout(() => {
      this.showCopiedToClipboardFeedback = null;
    }, 5000);

  }
}
