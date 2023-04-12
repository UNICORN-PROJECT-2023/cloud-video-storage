import { useEffect, useState } from 'react';
import ProfilePage from '../pages/ProfilePage';
import UserService from '../services/userService';

function ProfileScreen() {
  const userService = new UserService();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
  });

  async function getUser() {
    setLoading(true);
    const user = await userService.getCurrentUser();
    setData({
      username: user.body.username,
      email: user.body.email,
    });
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ProfilePage
      title="Profile page"
      loading={loading}
      username={data.username}
      email={data.email}
      link="/test"
    />
  );
}

export default ProfileScreen;