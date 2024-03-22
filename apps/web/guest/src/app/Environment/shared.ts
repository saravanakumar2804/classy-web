import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD5y6MtixrXKqCbKQOvIE8d8YPLztRA1bw',
  authDomain: 'guest-login-form.firebaseapp.com',
  projectId: 'guest-login-form',
  storageBucket: 'guest-login-form.appspot.com',
  messagingSenderId: '970270865999',
  appId: '1:970270865999:web:e65fd11b185acabcdfc83a',
  measurementId: 'G-E0TCQ2TE32',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
