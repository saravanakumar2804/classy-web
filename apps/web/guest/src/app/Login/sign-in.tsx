import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { mailOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../FireBase/firebase.config';
import '../guest.less';

const Sign_in: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          console.log('User is signed in:', currentUser);
        }
      });
      navigate('/Home');
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      setError('Invalid email or password.');
    }
  };

  const onRegister = () => {
    navigate('/Sign_up');
  };
  const handleForgotPassword = async () => {
    try {
      if (email.trim() === '') {
        alert('Please enter your email address.');
        return;
      }
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className="form-box">
      <div className="form-value">
        <img
          src="/assets/multiple-users-silhouette.png"
          alt=""
          className="user_img"
        />
        <h4>Users</h4>
        <div className="inputbox">
          <IonIcon className="mail-icon" icon={mailOutline} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
        {error && <p className="error">{error}</p>}

        <div className="forget">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <label>
            <a className="register" onClick={handleForgotPassword}>Forgot password?</a>
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
