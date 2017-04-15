import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsService } from '../../app/settings.service'
import { Settings } from '../../app/settings'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SettingsService]
})
export class HomePage {

  public settings: Settings
  public logs: string[]
  public logMax = 20
  public timer: any

  constructor(
    public navCtrl: NavController,
    public settingsService: SettingsService,
    public storage: Storage,
  ) {
    this.settings = new Settings()
    this.logs = []
    this.storage.ready().then(() => {
      this.storage.get('logs').then((val) => {
        if (val) {
          this.logs = val
        }
      })
    })
    this.timer = null
  }

  ionViewDidEnter(): void {
    this.settingsService.get().then(settings => {
      this.settings = settings
      this.checkStart()
      this.checkStop()
    })
  }
  // start SMS interval
  private checkStart(): void {
    if (!this.timer && this.settings && this.settings.enabled) {
      this.timer = setInterval(() => this.getSMS(), 3000)
    }
  }

  // stop SMS interval
  private checkStop(): void {
    if (this.timer && (!this.settings || !this.settings.enabled)) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  private getSMS(): string[] {
    this.logs.push('item ' + new Date().toLocaleString())
    this.logs = this.logs.slice(-this.logMax)
    this.storage.ready().then(() => {
      this.storage.set('logs', this.logs)
    })
    return this.logs
  }
}
