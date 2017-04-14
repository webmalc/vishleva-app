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

  constructor(
    public navCtrl: NavController,
    public settingsService: SettingsService
  ) {
    this.settings = new Settings()
  }
  ionViewWillEnter() {
    this.settings = this.getSettings()
  }
  getSettings(): Settings {
    return this.settingsService.get().then(val => this.settings = val)
  }
}
