import ProfilePage from '../pages/ProfilePage';

function ProfileScreen() {
  function onButtonClick() {
    alert('button clicked');
  }

  return (
    <ProfilePage
      title="Profile"
      //username={username}
      //email={email}
      //password={password}
      onButtonClick={onButtonClick}
      link="/test"
    />
  );
}

export default ProfileScreen;