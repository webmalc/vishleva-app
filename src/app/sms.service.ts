import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Settings } from './settings'
import { Storage } from '@ionic/storage';

@Injectable()
export class SmsService {

  readonly logMax = 20

  constructor(
    private http: Http,
    public storage: Storage,
  ) { }

  private sms: object[] = []

  getSms(settings: Settings) {
    return this.http.get(settings.url + '?key=' + settings.key)
      .map((res: Response) => res.json());
  }

  sendSms(settings: Settings) {
    return this.getSms(settings).subscribe(data => {
      this.parseResponse(data)
      this.writeLog()
    })
  }

  private parseResponse(data): void {
    this.sms = []
    for (let entry of JSON.parse(data)) {
      this.sms.push(
        entry.fields
      )
    }
  }

  private writeLog(): void {
    if (!this.sms.length) {
      return
    }

    this.storage.ready().then(() => {
      this.storage.get('logs').then((val) => {
        let logs = []
        let text = new Date().toLocaleString() + ' sms send: ' + this.sms.length
        if (val) {
          logs = val
        }
        logs.push(text)
        logs = logs.slice(-this.logMax)
        this.storage.set('logs', logs)
      })
    })
  }
}
