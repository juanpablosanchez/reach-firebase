import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { farebaseConfig } from '../../config/firebase.config';

const config = { ...farebaseConfig };

class Firebase {
  public auth: any;
  public db: any;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updatePassword(password);
    }

    return new Promise<void>((resolve) => resolve());
  };

  // *** User API ***

  user = (uid: any) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
