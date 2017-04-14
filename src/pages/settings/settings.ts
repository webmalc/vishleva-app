import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Settings } from '../../app/settings'
import { SettingsService } from '../../app/settings.service'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [SettingsService]
})
export class SettingsPage {

  public settings: Settings

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public settingsService: SettingsService
  ) {
    this.settings = new Settings()
    settingsService.get().then(val => this.settings = val)
  }

  private alert() {
    let toast = this.toastCtrl.create({
      message: 'Settings successfully saved!',
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  saveSettings() {
    this.storage.ready().then(() => {
      this.storage.set('settings', this.settings).then(() => { this.alert() })
    })
  }
}
