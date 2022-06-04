import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() {}

  playerid: any;

  setUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getEmail() {
    return this.getUser()?.email;
  }

  getToken() {
    return this.getUser()?.token;
  }
}
