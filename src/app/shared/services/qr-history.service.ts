import { Injectable } from '@angular/core';
import { EmailDetails, GeoDetails, MecardDetails, PhoneDetails, SmsDetails, WifiDetails } from '@sharedModule/models';
import { UUID } from 'angular2-uuid';
import { Dexie } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class QrHistoryService {
  private db: any;

  constructor() {
    this._createDatabase();
  }

  get getTimestamp() {
    return new Date().toJSON();
  }

  addScanedSmsToIndexedDb(smsScanResult: SmsDetails) {
    const RESULT_TO_STORE = {
      id: UUID.UUID(),
      phone: smsScanResult.phone,
      message: smsScanResult.message,
      createdOn: this.getTimestamp,
    };

    this.db.sms
      .add(RESULT_TO_STORE)
      .then(async () => {
        const allItems: { id: string, phone: string, message: string, createdOn: string }[] = await this.db.sms.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: any) => {
        alert('Error: ' + (e.stack || e));
      });
  }

  addScanedUrlToIndexedDb(urlScanResult: any) {
    const RESULT_TO_STORE = {
      id: UUID.UUID(),
      href: urlScanResult.href,
      domain: urlScanResult.domain,
      createdOn: this.getTimestamp,
    };

    this.db.url
      .add(RESULT_TO_STORE)
      .then(async () => {
        const allItems: { id: string, href: string, domain: string, createdOn: string }[] = await this.db.url.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: any) => {
        alert('Error: ' + (e.stack || e));
      });
  }

  addScanedGeoToIndexedDb(geoScanResult: GeoDetails) {
    const RESULT_TO_STORE = {
      id: UUID.UUID(),
      latitude: geoScanResult.latitude,
      longitude: geoScanResult.longitude,
      query: geoScanResult.query,
      createdOn: this.getTimestamp,
    };

    this.db.geo
      .add(RESULT_TO_STORE)
      .then(async () => {
        const allItems: {
          id: string,
          latitude: string,
          longitude: string,
          query: string;
          createdOn: string;
        }[] = await this.db.geo.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: any) => {
        console.error('Error: ' + (e.stack || e));
      });
  }

  addScanedEmailToIndexedDb(emailScanResult: EmailDetails) {
    const RESULT_TO_STORE = {
      id: UUID.UUID(),
      createdOn: this.getTimestamp,
      mailto: emailScanResult.mailto,
      subject: emailScanResult.subject,
      body: emailScanResult.body,
    };

    this.db.email
      .add(RESULT_TO_STORE)
      .then(async () => {
        const allItems: {
          id: string,
          mailto: string,
          subject: string,
          body: string;
          createdOn: string;
        }[] = await this.db.email.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: any) => {
        console.error('Error: ' + (e.stack || e));
      });
  }

  addScanedWifiToIndexedDb(wifiScanResult: WifiDetails) {
    const RESULT_TO_STORE = {
      id: UUID.UUID(),
      createdOn: this.getTimestamp,
      ssidOrNetworkName: wifiScanResult.ssidOrNetworkName,
      encryption: wifiScanResult.encryption,
      password: wifiScanResult.password,
      hidden: wifiScanResult.hidden,
    };

    this.db.wifi
      .add(RESULT_TO_STORE)
      .then(async () => {
        const allItems: {
          id: string;
          createdOn: string;
          ssidOrNetworkName: string;
          encryption: string;
          password: string;
          hidden: boolean;
        }[] = await this.db.wifi.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: any) => {
        console.error('Error: ' + (e.stack || e));
      });
  }

  addScanedMecardToIndexedDb(mecardScanResult: MecardDetails) {
    const RESULT_TO_STORE = {
      id: UUID.UUID(),
      createdOn: this.getTimestamp,
      fullName: mecardScanResult.fullName,
      organization: mecardScanResult.organization,
      address: mecardScanResult.address,
      phone: mecardScanResult.phone,
      email: mecardScanResult.email,
      notes: mecardScanResult.notes,
    };

    this.db.mecard
      .add(RESULT_TO_STORE)
      .then(async () => {
        const allItems: {
          id: string;
          createdOn: string;
          fullName: string;
          organization: string;
          address: string;
          phone: string;
          email: string;
          notes: string;
        }[] = await this.db.mecard.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: any) => {
        console.error('Error: ' + (e.stack || e));
      });
  }

  addScanedPhoneToIndexedDb(phoneScanResult: PhoneDetails) {
    const RESULT_TO_STORE = {
      id: UUID.UUID(),
      createdOn: this.getTimestamp,
      phone: phoneScanResult.phone,
    };

    this.db.phone
      .add(RESULT_TO_STORE)
      .then(async () => {
        const allItems: {
          id: string;
          createdOn: string;
          phone: string;
        }[] = await this.db.phone.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: any) => {
        console.error('Error: ' + (e.stack || e));
      });
  }

  addScanedMessageToIndexedDb(textScanResult: string) {
    const RESULT_TO_STORE = {
      id: UUID.UUID(),
      createdOn: this.getTimestamp,
      message: textScanResult,
    };

    this.db.text
      .add(RESULT_TO_STORE)
      .then(async () => {
        const allItems: {
          id: string;
          createdOn: string;
          message: string;
        }[] = await this.db.text.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: any) => {
        console.error('Error: ' + (e.stack || e));
      });
  }


  private _createDatabase() {
    this.db = new Dexie('ScannedQrCodes');
    this.db.version(1).stores({
      url: 'id,createdOn,href,domain',
      sms: 'id,createdOn,phone,message',
      geo: 'id,createdOn,latitude,longitude,query',
      email: 'id,createdOn,mailto,subject,body',
      wifi: 'id,createdOn,ssidOrNetworkName,encryption,password,hidden',
      mecard: 'id,createdOn,fullName,organization,address,phone,email,notes',
      phone: 'id,createdOn,phone',
      text: 'id,createdOn,message'
    });
  }
}
