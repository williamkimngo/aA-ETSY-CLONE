import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { signUp } from '../../../store/session';
import LoginForm from '../LoginModal/LoginForm';
import * as sessionActions from '../../../store/session'
import './SignUp.css';
const SignUpForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(sessionActions.signUp(firstName, username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Please Confirm both passwords are identical"])
    }
  };
  const handleLogin =(e) =>{
    setShowSignIn(true);
  }


  return (
    <>
    {showSignIn ? <LoginForm/>
    :
    <form onSubmit={onSignUp} className="signup-form-main">
       <div className='signup-upper'>
       <div className='signup-header'>Create your account</div>
        <div className='signup-caption'>Registration is easy.</div>
      </div>
      <div className="signup-error-outer">
        {errors.map((error, ind) => (
          <div className="signup-errors" key={ind}>{error}</div>
        ))}
      </div>
      <div className="signup-field-outer">
        <label className="signup-label">User Name *</label>
        <input
          className="signup-input"
          type='text'
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div className="signup-field-outer">
      <label className="signup-label">Email *</label>
        <input
          className="signup-input"
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div className="signup-field-outer">
      <label className="signup-label">First Name *</label>
        <input
          className="signup-input"
          type='text'
          name='email'
          onChange={(e) => setfirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div className="signup-field-outer">
      <label className="signup-label">Password *</label>
        <input
          className="signup-input"
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div className="signup-field-outer">
      <label className="signup-label">Confirm Password *</label>
        <input
          className="signup-input"
          type='password'
          name='confirm_password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}

        ></input>
      </div>
      <div className='signIn-account-message'>
        Already have an account?
        <span className='signup-login-button' onClick={() => handleLogin()}>Login</span>
      </div>
      <div className='signup-buttons-outer'>
      <button className="signup-form-button" type='submit'>Register</button>
      </div>
    </form>
     }
    </>
  );
};

export default SignUpForm;
