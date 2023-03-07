import { useEffect, useState } from 'react';
import ProfilePage from '../pages/ProfilePage';
import UserService from '../services/userService';

function ProfileScreen() {
  const userService = new UserService();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  function onButtonClick() {
    alert('button clicked');
  }

  useEffect(() => {
    getMe();
  },[])

  async function getMe() {
    setLoading(true);
    const user = await userService.getCurrentUser();
    setData(user);
    setLoading(false);
  }

  return (
    <ProfilePage
      title="Profile"
      isLoading={loading}
      username={data.username}
      email={data.email}
      password={data.password}
      onButtonClick={onButtonClick}
      link="/test"
    />
  );
}

export default ProfileScreen;