import { Injectable } from '@angular/core';
import { HelperService } from '../helper/helper.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private helper: HelperService) {}

  public login(user) {
    return new Promise(async (resolve, reject) => {
      this.http.post(`${this.helper.apiEndpoint}/login`, user).subscribe(
        (result) => {
          resolve(result);
          console.log('service success', result);
        },
        (err) => {
          reject(err);
          this.helper.errorToast({
            message: err?.error?.error,
            position: 'top',
          });
          console.log('service oops', err);
        }
      );
    });
  }

  registerUser(user) {
    return new Promise(async (resolve, reject) => {
      this.http.post(`${this.helper.apiEndpoint}/register`, user).subscribe(
        (result) => {
          resolve(result);
          console.log('service success', result);
        },
        (err) => {
          reject(err);
          this.helper.errorToast({
            message: err?.error?.error,
            position: 'top',
          });
          console.log('service oops', err);
        }
      );
    });
  }

  getUsers(params) {
    // Pagination page and per_page
    return new Promise(async (resolve, reject) => {
      this.http
        .get(`${this.helper.apiEndpoint}/users`, { params })
        .subscribe(
          (result) => {
            resolve(result);
            console.log('service success', result);
          },
          (err) => {
            reject(err);
            this.helper.errorToast({
              message: err?.error?.error,
              position: 'top',
            });
            console.log('service oops', err);
          }
        );
    });
  }
}
