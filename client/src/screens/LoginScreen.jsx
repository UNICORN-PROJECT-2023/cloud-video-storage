import React, { useState, useRef } from 'react';
import LoginPage from '../pages/LoginPage';
import UserService from '../services/userService';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const userService = new UserService();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function loginUser() {
    try {
      const response = await userService.login(emailRef.current.value, passwordRef.current.value);
      navigate('/profile/');
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LoginPage
      title="LOG IN"
      buttonText="Login"
      onButtonClick={loginUser}
      emailInput = {emailRef}
      passwordInput = {passwordRef}
    />
  );
}
export default LoginScreen;