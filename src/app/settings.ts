export class Settings {
  constructor(
    public url?: string,
    public key?: string,
    public enabled?: boolean,
    public interval?: number,
  ) { }

  getSmsUrl() {
    return this.url + '?key=' + this.key
  }
}
