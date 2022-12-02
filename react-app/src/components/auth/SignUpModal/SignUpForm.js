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

  const validate = () => {
    const errors = [];

    if (password.length === 0) {
      errors.push("Please enter a password");
    } else if (password.length > 20 || password.length < 6) {
      errors.push("Password must be between 6 and 20 characters");
    }

    if (password !== repeatPassword) {
      errors.push("Passwords don't match");
    }

    if (repeatPassword.length === 0) {
      errors.push("Please confirm your password");
    }

    if (username.length === 0) {
      errors.push("Please enter a username");
    } else if (username.length < 4 || username.length > 30) {
      errors.push("Username must be between 4 and 30 characters");
    }

    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.[a-z]{2,3}$/;

    if (email.length === 0) {
      errors.push("Please enter an email address");
    } else if (email.length < 3 || email.length > 256) {
      errors.push("Email must be between 3 and 255 characters");
    } else if (!emailReg.test(email)) {
      errors.push("Please enter a valid email");
    }

    if (errors.length > 0) setErrors(errors);
    setErrors(errors)
    return errors;
  };


  const onSignUp = async (e) => {
    const errors = validate()
    if(errors.length > 0) {
      e.preventDefault()
      setErrors(errors)
      return errors
    }
    // e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(sessionActions.signUp(username, email, firstName, password));
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
        <label className="signup-label">User Name<span>*</span></label>
        <input
          className="signup-input"
          type='text'
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div className="signup-field-outer">
      <label className="signup-label">Email<span>*</span></label>
        <input
          className="signup-input"
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div className="signup-field-outer">
      <label className="signup-label">First Name<span>*</span></label>
        <input
          className="signup-input"
          type='text'
          name='email'
          onChange={(e) => setfirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div className="signup-field-outer">
      <label className="signup-label">Password<span>*</span></label>
        <input
          className="signup-input"
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div className="signup-field-outer">
      <label className="signup-label">Confirm Password<span>*</span></label>
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
