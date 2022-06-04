import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async signOut() {
    const alert = await this.alertController.create({
      header: 'Sign Out',
      message: 'Are you sure wanna leave ?',
      mode: 'ios',
      cssClass: 'alert-apps',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          role: 'ok',
          text: 'Yes',
          handler: () => {
            localStorage.clear();
            this.navCtrl.navigateRoot('/welcome');
          },
        },
      ],
    });
    alert.present();
  }
}
