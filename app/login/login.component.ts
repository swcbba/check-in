import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import {FirebaseService} from '../services/firebase.service';
import * as ApplicationSettings from "application-settings";
import {TextField} from "ui/text-field"
import {User} from '../models/user.model';


@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "login.component.html",
})

export class LoginComponent implements OnInit {
    public user: User;
    public n_email;
    public n_password
    isAuthenticating = false;

    public constructor(private router: RouterExtensions, private firebaseService: FirebaseService) {
        this.user = {
            "email":"",
            "password":""
        }
    }

    public ngOnInit() {
        if(ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/home"], { clearHistory: true });
        }
    }

    public login() {
        this.firebaseService.login(this.user)
        .then((result) => {
            if(result!='error'){
                this.isAuthenticating = true;
                ApplicationSettings.setBoolean("authenticated", true);
                this.router.navigate(["/home"], { clearHistory: true } );
            }
        })
        .catch((message:any) => {
            this.isAuthenticating = false;
        });
    }
    
    public loginGoogle() {
        this.firebaseService.loginGoogle()
        .then((result) => {
            console.log(result);
            if(result!='error'){
                this.isAuthenticating = true;
                ApplicationSettings.setBoolean("authenticated", true);
                this.router.navigate(["/home"], { clearHistory: true } );
            }
        })
        .catch((message:any) => {
            this.isAuthenticating = false;
        });
    }

}