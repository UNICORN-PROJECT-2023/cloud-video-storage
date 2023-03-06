import React, { useState } from 'react';
import TestPage from '../pages/TestPage';
import UserService from '../services/userService';
import { useNavigate } from 'react-router-dom';

function TestScreen() {
  const [data, setData] = useState();
  const userService = new UserService();
  const navigate = useNavigate();

  async function onButtonClick() {
    const data = {
      name: 'Pavel Suchánek',
      email: 'pavelsuchanek@seznam.cz',
      password: '10785Rsdj__sx/"'
    };
    try {
      const response = await userService.register(data.name, data.email, data.password);
      navigate('/profile/' + response.username);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
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