import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  public get user$() {
    return this.angularFireAuth.user;
  }

  constructor(
    private readonly angularFireAuth: AngularFireAuth
  ) { }

  public login(): void {
    this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  public logout(): void {
    this.angularFireAuth.signOut();
  }

}
