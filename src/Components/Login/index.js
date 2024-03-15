import React, { useEffect, useState } from 'react';
import { useNavigate,  } from 'react-router-dom'; 
// import jwtToken from 'jsonwebtoken'
import Cookies from 'js-cookie';
import './index.css';

const LoginForm = () => {
  const history = useNavigate(); 
  const jwt= Cookies.get('jwt_token')
    
  useEffect(()=>{
    if(jwt!== undefined){
      history('/')
    }
  })
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const onSubmitSuccess = (jwt_token) => {
    // setIsLoggedIn(true);
    history('/'); //navigetion to the home page
    Cookies.set('jwt_token',jwt_token,  {"name":username, "password":password}, { expires: 1  });
    
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
      
      
    }
    else {
      setErrorMessage(data.error_msg);
      setShowError(true)
    }
    
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={onChangePassword}
        />
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={onChangeUsername}
        />
      </>
    );
  };

  

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showError && <p className='text-danger'>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
