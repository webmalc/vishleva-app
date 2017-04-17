import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsService } from '../../app/settings.service'
import { Settings } from '../../app/settings'
import { Storage } from '@ionic/storage';
import { SmsService } from '../../app/sms.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SettingsService, SmsService]
})
export class HomePage {

  public settings: Settings
  public logs: string[]
  public timer: any

  constructor(
    public navCtrl: NavController,
    public settingsService: SettingsService,
    public smsService: SmsService,
    public storage: Storage,
  ) {
    this.settings = new Settings()
    this.logs = []
    this.timer = null
  }

  ionViewDidEnter(): void {
    this.settingsService.get().then(settings => {
      this.settings = settings
      this.checkStart()
      this.getLogs()
    })
  }

  // start SMS interval
  private checkStart(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    if (this.settings && this.settings.enabled) {
      this.timer = setInterval(() => this.getSMS(), this.settings.interval)
    }
  }

  private getLogs(): void {
    this.storage.ready().then(() => {
      this.storage.get('logs').then((val) => {
        if (val) {
          this.logs = val
        }
      })
    })
  }

  private getSMS(): void {
    this.smsService.sendSms(this.settings)
    this.getLogs()
  }
}
