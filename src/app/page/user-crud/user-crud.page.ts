import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/service/helper/helper.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.page.html',
  styleUrls: ['./user-crud.page.scss'],
})
export class UserCrudPage implements OnInit {
  user: any = { email: '', name: '', gender: '' };

  constructor(
    private modalCtrl: ModalController,
    private usersService: UserService,
    private helper: HelperService
  ) {}

  ngOnInit() {}

  async createData() {
    await this.usersService
      .createEmployee(this.user)
      .then((resp) => {
        // console.log(resp['data']);
        this.helper.presentToast({ message: 'Data Berhasil ditambahkan' });
        this.modalCtrl.dismiss();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
