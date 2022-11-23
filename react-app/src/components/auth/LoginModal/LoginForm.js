import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import SignUpForm from '../SignUpModal/SignUpForm';
import './loginForm.css';
import * as sessionActions from "../../../store/session"

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(sessionActions.login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  const resetErrors = () => {
    setErrors([])
  }

  const SignupTransition = (e) => {
    setShowSignup(true)
  }


  return (
    <div>
      {showSignup ? <SignUpForm/>
      :
      <div className='login-form-main'>
      <div className="login-top">
      <div className="login-title">Sign In</div>
      <div className='login-register-button' onClick={() => SignupTransition()}>Register</div>
      </div>
      <form onSubmit={onLogin}>
        <div className="login-error">
          {errors.map((error, ind) => (
            <div className="login-errors" key={ind}>{error}</div>
          ))}
        </div>
        <div className="login-field-outer">
          <label className="login-label" htmlFor='email'>Email *</label>
          <input
            className="login-input"
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-field-outer">
          <label className="login-label" htmlFor='password'>Password *</label>
          <input
            className="login-input"
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
          <div className='login-buttons-outer'>
          <button type='submit' className='login-form-button'>Login</button>
          <button className='login-form-demo-button' onClick={() => {
              resetErrors()
              setEmail("demo@aa.io")
              setPassword("password")}}>Demo User</button>
          </div>

      </form></div>
      }
    </div>
  );
};

export default LoginForm;
