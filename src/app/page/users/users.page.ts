import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/service/helper/helper.service';
import { UserService } from 'src/app/service/user/user.service';
import { UserCrudPage } from '../user-crud/user-crud.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any = [];
  loading: boolean = false;
  params: any = { pagination: { page: 0, pageSize: 10, populate: '*' } };

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    private helper: HelperService
  ) {}

  ngOnInit() {
    this.loadData(this.params);
  }

  async loadData(params) {
    await this.userService
      .getEmployee(params)
      .then((resp) => {
        // console.log(resp['data'])
        this.users = resp['data'];
        this.params.pagination.page = resp['meta']['pagination']['page'] + 1; //to get current page
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  async loadMore(event) {
    await this.userService
      .getEmployee(this.params)
      .then((resp) => {
        console.log(resp);
        if (resp['data'].length > 0) {
          this.params.pagination.page = resp['meta']['pagination']['page'] + 1;
          this.users.push(...resp['data']);
        } else {
          // App logic to determine if all data is loaded
          // and disable the infinite scroll
          // event.target.disabled = true;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async openAdd() {
    const modal = await this.modalCtrl.create({
      component: UserCrudPage,
      mode: 'ios',
    });
    modal.onWillDismiss().then(async () => {
      // console.log("onWillDismiss");
      await this.loadData({ pagination: { page: 0, pageSize: 10, populate: '*' } });
    });
    return await modal.present();
  }

  doRefresh(event) {
    this.loading = true;

    setTimeout(() => {
      this.loadData({ pagination: { page: 0, pageSize: 10, populate: '*' } });
      event.target.complete();
    }, 2000);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  
}
