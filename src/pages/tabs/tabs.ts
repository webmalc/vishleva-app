import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPage;

  constructor(public loadingCtrl: LoadingController) {
    this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    }).present();
  }
}
