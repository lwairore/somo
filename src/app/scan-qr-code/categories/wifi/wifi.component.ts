import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WifiDetails } from '@sharedModule/models';
import { stringContainsALink } from '@sharedModule/utils';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WifiComponent implements OnInit {
  @Input() wifiScanResult: WifiDetails = {};
  @Output() scanAgain = new EventEmitter<boolean>();
  contentContainsURL = stringContainsALink;

  showCopiedToClipboardFeedback: boolean | null = null;

  constructor(private clipboard: Clipboard) { }

  ngOnInit(): void {
  }

  resetScanner(): void {
    this.scanAgain.emit(true);
  }

  copyToClipboard() {
    const text = this.constructWifiText();

    this.clipboard.copy(text);
    this.showCopiedToClipboardFeedback = true;

    setTimeout(() => {
      this.showCopiedToClipboardFeedback = null;
    }, 5000);

  }

  copyPasswordToClipboard(): void {
    this.clipboard.copy(this.wifiScanResult.password ?? '');

    this.showCopiedToClipboardFeedback = true;

    setTimeout(() => {
      this.showCopiedToClipboardFeedback = null;
    }, 5000);
  }

  constructWifiText(): string {
    let text = '';

    if (this.wifiScanResult.ssidOrNetworkName) {
      text += 'SSID/Network Name: ';
      text += this.wifiScanResult.ssidOrNetworkName + '\n';
    }

    if (this.wifiScanResult.encryption) {
      text += 'WI-FI Encryption: ';
      text += this.wifiScanResult.encryption + '\n';
    }

    if (this.wifiScanResult.password) {
      text += 'WI-FI Password: ';
      text += this.wifiScanResult.password + '\n';
    } else {
      text += 'WI-FI Password: Not set';
    }

    if (this.wifiScanResult.hidden) {
      text += 'WI-FI is hidden';
    }

    return text;
  }

}
