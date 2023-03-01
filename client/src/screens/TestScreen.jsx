import React, { useState } from 'react';
import TestPage from '../pages/TestPage';
import ApiService from '../services/apiService';

function TestScreen() {
  const [data, setData] = useState(null);
  const apiService = new ApiService();

  async function onButtonClick() {
    const data = {
      email: 'pavelsuchanek@seznam.cz',
      password: '10785Rsdj__sx/"'
    };
    const response = await apiService.post('/register', data);
    setData(response);
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