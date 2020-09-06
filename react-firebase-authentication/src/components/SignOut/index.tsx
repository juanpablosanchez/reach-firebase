import React from 'react';
import Firebase from '../Firebase/firebase';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }: { firebase: Firebase }) => (
    <button type="button" onClick={firebase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOutButton);