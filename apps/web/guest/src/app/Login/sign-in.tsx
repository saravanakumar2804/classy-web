import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../FireBase/firebase.config';
import '../guest.less';

const Sign_in: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          console.log('User is signed in:', currentUser);
        } else {
          console.log('No user is signed in.');
        }
      });
      console.log('User signed in:', user);
      navigate('/Home');
    } catch (error:any) {
      console.error('Error signing in:', error.message);
    }
  };

  const onRegister = () => {
    navigate('/Sign_up');
  };

  return (
    <div className="form-box">
      <div className="form-value">
        <img src="/assets/multiple-users-silhouette.png" alt="" className="user_img" />
        <h4>Users</h4>
        <div className="inputbox">
          <IonIcon icon={mailOutline} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required  />
          <label htmlFor="">Email</label>
        </div>
        <div className="inputbox">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <IonIcon
            icon={showPassword ? eyeOutline : eyeOffOutline}
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          />
          <label htmlFor="">Password</label>
        </div>
        <div className="forget">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <label>
            <a href="#">Forgot password?</a>
          </label>
        </div>
        <button onClick={onFinish}>Log in</button>
        <br />
        <div className="register">
          <p>
            Don't have an account? <a onClick={onRegister}>Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sign_in;
