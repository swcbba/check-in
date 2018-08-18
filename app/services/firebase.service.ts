import firebase = require("nativescript-plugin-firebase");
import {Injectable, NgZone} from "@angular/core";
import {User} from '../models/user.model';

@Injectable()
export class FirebaseService {
  constructor(
    private ngZone: NgZone,
  ){}

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password
      }
    }).then((result: any) => {
          return JSON.stringify(result);
      }, (errorMessage: any) => {
        alert('error: ' +errorMessage);
        return 'error';
      });
  }
  
  loginGoogle() {
    return firebase.login({
      type: firebase.LoginType.GOOGLE
    }).then((result: any) => {
        console.log(result);
        JSON.stringify(result);
      }, (errorMessage: any) => {
        alert('error: ' +errorMessage);
        return 'error';
      });
  }

}