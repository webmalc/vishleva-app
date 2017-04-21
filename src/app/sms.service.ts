import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Settings } from './settings'
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { SMS } from '@ionic-native/sms';

class SmsEntry {
  phone: string
  text: string
}

@Injectable()
export class SmsService {

  readonly logMax = 50

  constructor(
    private http: Http,
    public storage: Storage,
    public smsSender: SMS,
  ) { }

  private sms: SmsEntry[] = []

  getSms(settings: Settings): Observable<string[]> {
    return this.http.get(settings.url + '?key=' + settings.key)
      .map((res: Response) => res.json())
  }

  sendSms(settings: Settings) {
    return this.getSms(settings).subscribe(
      data => {
        this.parseResponse(data)
        for (let entry of this.sms) {
          this.smsSender.send(entry.phone, entry.text)
        }
        this.writeLog()
      },
      error => { this.writeLog('error occurred while retrieving sms') }
    )
  }

  private parseResponse(data): void {
    this.sms = []
    for (let entry of JSON.parse(data)) {
      this.sms.push(
        entry.fields
      )
    }
  }

  private writeLog(message?: string): void {
    this.storage.ready().then(() => {
      this.storage.get('logs').then((val) => {
        let logs = []
        let logText = message ? message : this.sms.length ? 'sms send: ' + this.sms.length : 'idle...'
        let text = new Date().toLocaleString() + ' - ' + logText
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
