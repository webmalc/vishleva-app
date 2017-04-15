import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsService } from '../../app/settings.service'
import { Settings } from '../../app/settings'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SettingsService]
})
export class HomePage {

  public settings: Settings
  public logs: string[]
  public logMax = 50

  constructor(
    public navCtrl: NavController,
    public settingsService: SettingsService
  ) {
    this.settings = new Settings()
    this.logs = []
  }

  ionViewWillEnter(): void {
    this.settings = this.getSettings()
    setInterval(() => this.getSMS(), 3000)
  }

  private getSMS(): string[] {
    this.logs.push('item ' + new Date().toLocaleString())
    this.logs = this.logs.slice(-this.logMax)
    return this.logs
  }

  getSettings(): Settings {
    return this.settingsService.get().then(val => this.settings = val)
  }
}
