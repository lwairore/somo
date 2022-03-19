import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-qr-code',
  templateUrl: './scan-qr-code.component.html',
  styles: [
  ]
})
export class ScanQrCodeComponent implements OnInit {
  scanResult: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  reset(): void {
    this.scanResult = null;
  }


  scannedQrCodeResult(qrCodeResult: any) {
    console.log("valueEmitted");
    this.scanResult = qrCodeResult;
  }

}
