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
      this.http.post(`${this.helper.apiEndpoint}/auth/local`, user).subscribe(
        (result) => {
          resolve(result);
          console.log('service success', result);
        },
        (err) => {
          console.log(err);
          reject(err);
          this.helper.errorToast({
            message: err?.error?.error?.message,
            position: 'top',
          });
          console.log('service oops', err);
        }
      );
    });
  }

  registerUser(user) {
    return new Promise(async (resolve, reject) => {
      this.http
        .post(`${this.helper.apiEndpoint}/auth/local/register`, user)
        .subscribe(
          (result) => {
            resolve(result);
            console.log('service success', result);
          },
          (err) => {
            reject(err);
            this.helper.errorToast({
              message: err?.error?.error?.message,
              position: 'top',
            });
            console.log('service oops', err);
          }
        );
    });
  }

  getEmployee(item) {
    // Pagination page and per_page
    return new Promise(async (resolve, reject) => {
      this.http
        .get(
          `${this.helper.apiEndpoint}/employees?${this.helper.encodeQS(item)}` //Using encodeQS to convert object to query string
        )
        .subscribe(
          (result) => {
            resolve(result);
            console.log('service success', result);
          },
          (err) => {
            reject(err);
            this.helper.errorToast({
              message: err?.error?.error?.message,
              position: 'top',
            });
            console.log('service oops', err);
          }
        );
    });
  }

  createEmployee(item) {
    return new Promise(async (resolve, reject) => {
      this.http
        .post(`${this.helper.apiEndpoint}/employees`, { data: item })
        .subscribe(
          (result) => {
            resolve(result);
            console.log('service success', result);
          },
          (err) => {
            reject(err?.message);
            err?.error?.error?.details?.errors.forEach((element) => {
              console.log(element);
              this.helper.errorToast({ message: element.message });
            });
            this.helper.errorToast({ message: err?.error?.error?.message });
            console.log('service oops', err);
          }
        );
    });
  }
}
