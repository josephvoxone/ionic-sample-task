import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersPage } from '../page/users/users.page';
import { HelperService } from '../service/helper/helper.service';
import { ProfileService } from '../service/profile/profile.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  users: any = [];
  loading: boolean = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private modalCtrl: ModalController,
    private helper: HelperService
  ) {}

  ionViewDidEnter() {
    this.loadData();
  }

  userEmail() {
    return this.profileService.getEmail();
  }

  userToken() {
    return this.profileService.getToken();
  }

  async loadData() {
    await this.userService
      .getUsers({ page: 1, per_page: 5 })
      .then((resp) => {
        // console.log(resp['data'])
        this.users = resp['data'];
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: UsersPage,
      mode: 'ios',
    });
    return await modal.present();
  }

  doRefresh(event) {
    this.loading = true;

    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 2000);
  }

  introduce(item) {
    this.helper.presentToast({
      message: `This is ${item.first_name}  ${item.last_name}`,
    });
  }
}
