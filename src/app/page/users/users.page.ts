import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/service/helper/helper.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any = [];
  loading: boolean = false;
  params: any = { page: 0, per_page: 8 };

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
      .getUsers(params)
      .then((resp) => {
        // console.log(resp['data'])
        this.users = resp['data'];
        this.params.page = resp['page'] + 1; //to get current page
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
      .getUsers(this.params)
      .then((resp) => {
        console.log(resp);
        if (resp['data'].length > 0) {
          this.params.page = resp['page'] + 1;
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

  doRefresh(event) {
    this.loading = true;

    setTimeout(() => {
      this.loadData({ page: 0, per_page: this.params.per_page });
      event.target.complete();
    }, 2000);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
