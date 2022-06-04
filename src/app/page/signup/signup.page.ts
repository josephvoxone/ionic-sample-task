import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/service/helper/helper.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private usersService: UserService,
    private helper: HelperService
  ) {}

  user: any = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
    confirm: 'cityslicka',
  };
  hide: any;
  hide1: any;

  loading: boolean = false;

  ngOnInit() {}

  async register(user) {
    this.loading = true;
    await this.usersService
      .registerUser(user)
      .then((resp) => {
        console.log(resp['data']);
        this.helper.presentToast({ message: `Successfuly created` });
        this.navCtrl.back();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
