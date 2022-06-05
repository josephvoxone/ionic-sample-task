import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  // public apiEndpoint = `https://reqres.in/api`; // REQRES API
  public apiEndpoint = `http://localhost:1337/api`// STRAPI API

  constructor(private toastController: ToastController) {}

  encodeQS(data){
    const query = qs.stringify(data, {
      encodeValuesOnly: true,
    });

    return query;
  }

  async presentToast(data) {
    const toast = await this.toastController.create({
      header: data?.header,
      message: data?.message,
      mode: 'ios',
      color: data?.color ? data.color : 'success',
      position: data?.position ? data.position : 'bottom',
      duration: 3000,
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-done-outline',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async errorToast(data) {
    // console.log(data)
    const toast = await this.toastController.create({
      mode: 'ios',
      header: data?.header,
      message: data?.message,
      color: 'danger',
      position: data.position ? data.position : 'bottom',
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'warning',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await toast.present();
  }
}
