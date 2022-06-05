import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/service/helper/helper.service';
import { ProfileService } from 'src/app/service/profile/profile.service';
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
    private helper: HelperService,
    private profileService: ProfileService
  ) {}

  user: any = {
    email: 'dummy@nirmalab.com',
    username: 'dummy',
    password: '123456',
    confirm: '123456',
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
        this.profileService.setUser(resp);
        this.helper.presentToast({
          message: `Welcome aboard, ${user.username}!`,
        });
        this.navCtrl.navigateRoot('/tabs/tab1', { animated: true });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
