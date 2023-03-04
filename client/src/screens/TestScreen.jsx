import React, { useState } from 'react';
import TestPage from '../pages/TestPage';
import UserService from '../services/userService';

function TestScreen() {
  const [data, setData] = useState();
  const userService = new UserService();

  async function onButtonClick() {
    const data = {
      email: 'pavelsuchanek@seznam.cz',
      password: '10785Rsdj__sx/"'
    };
    const response = await userService.register(data.email, data.password);
    console.log(response)
    setData(response)
  }

  return (
    <TestPage
      title="Test"
      buttonText="Register"
      onButtonClick={onButtonClick}
      data={data && JSON.stringify(data)}
      link="/home"
    />
  );
}
export default TestScreen;