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
    return JSON.parse(localStorage.getItem('user'))?.user;
  }

  getToken() {
    return JSON.parse(localStorage.getItem('user'))?.jwt;
  }

  getEmail() {
    return this.getUser()?.email;
  }

  getUsername() {
    return this.getUser()?.username;
  }
  
  isBlocked() {
    return this.getUser()?.blocked;
  }

  isConfirmed() {
    return this.getUser()?.confirmed;
  }
}
