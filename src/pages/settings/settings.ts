import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Settings } from '../../app/settings'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public settings: Settings

  constructor(public navCtrl: NavController) {
    this.settings = new Settings('werr', 'rere')
  }

  saveSettings() {
    console.log(this.settings)
  }
}
