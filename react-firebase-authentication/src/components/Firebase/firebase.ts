import app from 'firebase/app';
import { farebaseConfig } from '../../config/firebase.config';

const config = { ...farebaseConfig };

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
