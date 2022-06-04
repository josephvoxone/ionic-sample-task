import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  user: any = { email: 'eve.holt@reqres.in', password: 'cityslicka' };
  loading: boolean = false;
  hide: any;

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {}

  async loginApps(user) {
    this.loading = true;
    await this.userService
      .login(user)
      .then((resp) => {
        console.log(resp);
        user.token = resp['token']; //add new object token from reqres
        this.profileService.setUser(user);
        this.navCtrl.navigateRoot('/tabs/tab1', { animated: true });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  }
}
