import { useEffect, useState, useRef } from 'react';
import ProfilePage from '../pages/ProfilePage';
import UserService from '../services/userService';
import VideoService from '../services/videoService';

function ProfileScreen() {
  const userService = new UserService();
  const videoService = new VideoService();
  const [loading, setLoading] = useState(false);
  const [userVideos, setUserVideos] = useState([]);
  const [data, setData] = useState({
    id: "",
    username: "",
    email: "",
  });

  async function getUser() {
    setLoading(true);
    const user = await userService.getCurrentUser();
    setData({
      id: user.body.id,
      username: user.body.username,
      email: user.body.email,
    });
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    async function fetchUserVideos() {
      try {
        const userVideos = await videoService.getAllVideos();
        setUserVideos(userVideos.body);
        console.log(userVideos)
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserVideos();
  }, []);

  const nameRef = useRef();
  const episodeRef = useRef();
  const descriptionRef = useRef();
  const originalLinkRef = useRef();
  const materialsRef = useRef();

  async function createVideo() {
    try {
      const response = await videoService.createVideo(
        nameRef.current.value,
        episodeRef.current.value,
        descriptionRef.current.value, 
        originalLinkRef.current.value, 
        materialsRef.current.value
      );
      console.log(response.body);
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <ProfilePage
      title="Profile page"
      loading={loading}
      username={data.username}
      email={data.email}
      link="/test"
      
      dataForUserVideos={userVideos}
      nameRef={nameRef}
      descriptionRef={descriptionRef}
      episodeRef={episodeRef}
      urlRef={originalLinkRef}
      materialsRef={materialsRef}
      onButtonClick={createVideo}
    />
  );
}

export default ProfileScreen;