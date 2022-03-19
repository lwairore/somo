import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import jsQR from 'jsqr';

const WINDOW_NAVIGATOR = window.navigator as any;

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-scan-or-upload',
  templateUrl: './scan-or-upload.component.html',
  styles: [
  ],
})
export class ScanOrUploadComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video', { static: false })
  private _videoElRef: ElementRef | undefined;

  @ViewChild('canvas', { static: false })
  private _canvasElRef: ElementRef | undefined;

  @ViewChild('fileinput', { static: false })
  private _fileinputElRef: ElementRef | undefined;

  @ViewChild('permissionDeniedNotifier', { read: ElementRef })
  private _permissionNotifier: ElementRef | undefined;

  private _canvasElement: any;

  private _videoElement: any;

  private _canvasContext: any;

  scanActive = false;

  imgObjectURLs: string[] = [];

  failedToReadQRCode = false;

  cameraFacingMode = {
    frontCamera: 'user',
    rearCamera: 'environment'
  }

  platformIsIOS: boolean | undefined;

  _loading = false;

  @Output() qrCodeScanned = new EventEmitter<string>();

  TIME_THRESHOLD = 1000; // 1000

  constructor(
    private _plt: Platform,
  ) {
    this.platformIsIOS = this._plt.IOS;
    const isInStandaloneMode = () =>
      'standalone' in WINDOW_NAVIGATOR && WINDOW_NAVIGATOR?.standalone;
    if (this._plt.IOS && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }
  }

  ngOnDestroy(): void {
    this.reset();
    this._revokeObjectURLs();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._canvasElement = this._canvasElRef?.nativeElement;
    this._canvasContext = this._canvasElement.getContext('2d');
    this._videoElement = this._videoElRef?.nativeElement;

    this.startScan(this.cameraFacingMode.rearCamera);
  }

  deliverQrCodeResult(scanResult: string): void {
    this.reset();
    console.log('deliverQrCodeResult')
    console.log(scanResult);
    this.qrCodeScanned.emit(scanResult);
  }

  reset() {
    this.stopScan();
  }

  stopScan() {
    this.scanActive = false;
    this._resetFailedToReadQRCode();
    const stream = this._videoElement?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(function (track: any) {
        track?.stop();
      });

      this._videoElement.srcObject = null;
    }

    // this.smsToScanResult = {};
  }


  private _revokeObjectURLs() {
    this.imgObjectURLs.forEach(url =>
      URL.revokeObjectURL(url));
  }

  private _triggerPermissionNeeded() {
    if (this._permissionNotifier instanceof ElementRef) {
      this._permissionNotifier.nativeElement.click();
    }
  }

  async startScan(
    facingMode: string) {
    this.reset();
    this._resetFailedToReadQRCode();
    // Not working on iOS standalone mode!

    const videoOptions: any = {};

    if (facingMode === this.cameraFacingMode.frontCamera) {
      videoOptions['facingMode'] = this.cameraFacingMode.frontCamera;
    } else {
      videoOptions['facingMode'] = this.cameraFacingMode.rearCamera;
    }

    const startTime = Date.now();
    const detectPermissionDialog = function (allowed: any, timeThreshold = 1000) {
      if (Date.now() - startTime > timeThreshold) {
        // dialog was shown
      }
    };
    // const successCallback = function (error: any) {
    //   detectPermissionDialog(true);
    // };


    await navigator.mediaDevices.getUserMedia({
      video: videoOptions
    }).then(success => {
      this._videoElement.srcObject = success;
      // Required for Safari
      this._videoElement.setAttribute('playsinline', true);

      this._loading = true;

      this._videoElement?.play();
      requestAnimationFrame(this._scan.bind(this));
    }, error => {
      console.error(error)
      if ((error.name == 'NotAllowedError') ||
        (error.name == 'PermissionDismissedError')) {
        this._triggerPermissionNeeded();

        detectPermissionDialog(false);
      }
    });


  }

  private _causeVibration() {
    let newVariable: any;
    newVariable = window?.navigator;

    newVariable.vibrate = navigator.vibrate ||
      newVariable.webkitVibrate ||
      newVariable.mozVibrate ||
      newVariable.msVibrate;

    if (newVariable.vibrate) {
      // single vibration. duration of vibration in ms
      newVariable.vibrate(100);
    }
  }

  convertCanvasToImage(imagedata: any, location: any) {
    const canvas = document.createElement('canvas');

    let ctx = canvas.getContext('2d');

    const drawLine = (begin: any, end: any, color: any) => {
      if (ctx instanceof CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(begin.x, begin.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    }

    drawLine(location.topLeftCorner, location.topRightCorner, "#FF3B58");
    drawLine(location.topRightCorner, location.bottomRightCorner, "#FF3B58");
    drawLine(location.bottomRightCorner, location.bottomLeftCorner, "#FF3B58");
    drawLine(location.bottomLeftCorner, location.topLeftCorner, "#FF3B58");

    canvas.width = imagedata.width;

    canvas.height = imagedata.height;

    ctx?.putImageData(imagedata, 0, 0);

    const src = URL.createObjectURL((this.dataURItoBlob(canvas.toDataURL())));

    this.imgObjectURLs.push(src);

    return src;
  }

  dataURItoBlob(dataURI: any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;

  }



  private async _scan() {
    if (this._videoElement.readyState === this._videoElement.HAVE_ENOUGH_DATA) {
      if (this._loading) {
        // await this._loading.dismiss();
        this._loading = false;

        this.scanActive = true;
      }

      this._canvasElement.height = this._videoElement.videoHeight;

      this._canvasElement.width = this._videoElement.videoWidth;

      this._canvasContext.drawImage(
        this._videoElement,
        0,
        0,
        this._canvasElement.width,
        this._canvasElement.height
      );
      const imageData = this._canvasContext.getImageData(
        0,
        0,
        this._canvasElement.width,
        this._canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code && code?.data?.trim()?.length) {
        this._resetFailedToReadQRCode();

        this.stopScan();

        this.scanActive = false;

        this._causeVibration();

        this.deliverQrCodeResult(code.data);

        this.convertCanvasToImage(imageData, code.location);


      } else {
        this._notifyUserFailedToReadQRCode();
        if (this.scanActive) {
          requestAnimationFrame(this._scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this._scan.bind(this));
    }
  }

  private _notifyUserFailedToReadQRCode() {
    this.failedToReadQRCode = true;
  }

  scanAgain() {
    this.reset();
    this.startScan(this.cameraFacingMode.rearCamera)
  }

  captureImage() {
    this._fileinputElRef?.nativeElement.click();
  }

  private _resetFailedToReadQRCode() {
    this.failedToReadQRCode = false;
  }

  private _prepareFilesList(files: FileList): void {
    const filesKeys = Object.keys(files);

    for (const fileKey of filesKeys) {
      const file = files.item(+fileKey);

      if (!(file instanceof File)) { continue; }

      const mimeType = file.type;
      if (mimeType.match(/image\/*/) === null) {
        // Only images are supported
        return;
      }

      const img = new Image();
      img.onload = () => {
        this._canvasContext.drawImage(img, 0, 0, this._canvasElement.width, this._canvasElement.height);
        const imageData = this._canvasContext.getImageData(
          0,
          0,
          this._canvasElement.width,
          this._canvasElement.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code && code?.data?.trim()?.length) {
          this._resetFailedToReadQRCode();
          this.stopScan();
          this._causeVibration();
          this.deliverQrCodeResult(code.data);
        } else {
          this._notifyUserFailedToReadQRCode();
          this.startScan(this.cameraFacingMode.rearCamera);
        }
      };
      this._revokeObjectURLs();
      img.src = URL.createObjectURL(file);
      this.imgObjectURLs.push(img.src);

    }


  }

  handleFile(event: any) {
    let files: any = <HTMLInputEvent>event.target.files;

    console.log(files);
    console.log(files.length)

    if (files?.length < 1) {
      this.startScan(this.cameraFacingMode.rearCamera);
      return;
    }

    // this.reset();

    this._prepareFilesList(files);
  }

}
