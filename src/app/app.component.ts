import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProfileService } from './service/profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private profileService: ProfileService
  ) {
    
    // If Localstorage has user, then go to tabs page
    if (this.profileService.getUser() == null) {
      this.navCtrl.navigateRoot('/welcome');
    }
  }
}
