import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsService } from '../../app/settings.service'
import { Settings } from '../../app/settings'
import { Storage } from '@ionic/storage';
import { SmsService } from '../../app/sms.service'
import { BackgroundMode } from '@ionic-native/background-mode';
import { Badge } from '@ionic-native/badge';
import { Push, PushToken } from '@ionic/cloud-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SettingsService, SmsService, BackgroundMode, Badge]
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
    public backgroundMode: BackgroundMode,
    public push: Push,
    public badge: Badge
  ) {
    this.settings = new Settings()
    this.logs = []
    this.timer = null
    this.registerPush()
  }

  ionViewDidEnter(): void {
    this.registerPush()
    this.backgroundMode.enable()
    this.settingsService.get().then(settings => {
      this.settings = settings
      this.run()
      this.backgroundMode.on('activate').subscribe(() => {
        this.run()
      })
    })
  }

  private registerPush(): void {
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      // console.log('Token saved:', t.token);
    });
  }

  private run(): void {
    this.checkStart()
    this.getLogs()
  }

  // start SMS interval
  private checkStart(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    if (this.settings && this.settings.enabled) {
      this.timer = setInterval(() => this.getSMS(), this.settings.interval * 1000)
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
