import * as firebase from 'firebase/app';
import 'firebase/auth';

import store from 'redux/index';
import { loggedIn, loggedOut } from 'redux/auth/slice';

class AuthService {
  subscribeToAuthStateChangeListener() {
    if (this.unsubscribeFromAuthStateChangeListener) {
      console.warn(
        'Auth state change listener was already subscribed - unsbscribe first',
      );
      this.unsubscribeFromAuthStateChangeListener();
    }

    this.unsubscribeFromAuthStateChangeListener = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log('User signed in', user.displayName);
          const { displayName: name, email, uid } = user;
          store.dispatch(loggedIn({ uid, name, email }));
        } else {
          // User is signed out.
          console.log('User signed out', user);
          store.dispatch(loggedOut());
        }
      });
  }
}

export default new AuthService();
