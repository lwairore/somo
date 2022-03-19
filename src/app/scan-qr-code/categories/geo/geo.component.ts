import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { constructGoogleMapsDirectionAPI, constructGoogleMapsDisplayMapAPI, constructGoogleMapsSearchAPI } from '@sharedModule/google-maps-apis';
import { GeoDetails } from '@sharedModule/models';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoComponent implements OnInit {
  @Input() geoScanResult: GeoDetails = { latitude: '', longitude: '' };
  @Output() scanAgain = new EventEmitter<boolean>();

  constructGoogleMapsDirectionAPI = constructGoogleMapsDirectionAPI;
  constructGoogleMapsDisplayMapAPI = constructGoogleMapsDisplayMapAPI;
  constructGoogleMapsSearchAPI = constructGoogleMapsSearchAPI;

  showCopiedToClipboardFeedback: boolean | null = null;

  constructor(private clipboard: Clipboard) { }


  ngOnInit(): void {
  }

  resetScanner(): void {
    this.scanAgain.emit(true);
  }

  constructGeoText(): string {
    let text = '';

    if (this.geoScanResult.latitude) {
      text += this.geoScanResult.latitude + '\n';
    }

    if (this.geoScanResult.longitude) {
      text += this.geoScanResult.longitude + '\n';
    }

    if (this.geoScanResult.query) {
      text += this.geoScanResult.query + '\n';
    }

    return text;
  }

  copyToClipboard() {
    const text = this.constructGeoText();

    this.clipboard.copy(text);
    this.showCopiedToClipboardFeedback = true;

    setTimeout(() => {
      this.showCopiedToClipboardFeedback = null;
    }, 5000);

  }

}
