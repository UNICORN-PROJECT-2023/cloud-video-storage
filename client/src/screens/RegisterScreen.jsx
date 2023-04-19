import React, { useState, useRef } from 'react';
import RegisterPage from '../pages/RegisterPage';
import UserService from '../services/userService';
import { useNavigate } from 'react-router-dom';

function RegisterScreen() {
  const userService = new UserService();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  async function registerUser() {
    try {
      const response = await userService.register(emailRef.current.value, usernameRef.current.value, passwordRef.current.value);
      navigate('/profile/');
      console.log(response)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <RegisterPage
      title="REGISTER"
      buttonText="Register"
      error={error}
      onButtonClick={registerUser}
      emailInput = {emailRef}
      usernameInput = {usernameRef}
      passwordInput = {passwordRef}
    />
  );
}
export default RegisterScreen;
