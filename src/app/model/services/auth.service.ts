import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, browserPopupRedirectResolver, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private firebase: FirebaseService,
    private auth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      }
      localStorage.setItem('user', 'null');
    });
  }

  public signInto(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  public resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }

  public exit() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signin']);
    });
  }

  public loggedInUser(): boolean {
    const user: any = JSON.parse(localStorage.getItem('user') || 'null');
    return user !== null ? true : false;
  }

  public getLoggedInUser() {
    const user: any = JSON.parse(localStorage.getItem('user') || 'null');
    return user !== null ? user : null;
  }

  public signinWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }

  public signinWithX() {
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }
}
