import { Injectable } from '@angular/core';
import { Settings } from './settings'
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsService {

  constructor(public storage: Storage) { }

  public get(): Promise<Settings> {
    return new Promise(resolve => {
      this.storage.get('settings').then((val) => {
        if (!val) {
          val = new Settings()
        }
        resolve(val)
      })
    })
  }
}
