import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersPage } from '../page/users/users.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: UsersPage,
      mode: 'ios',
    });
    return await modal.present();
  }
}
