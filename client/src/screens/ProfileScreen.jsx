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
        const userVideos = await videoService.getUserVideos();
        setUserVideos(userVideos.body);
        console.log(userVideos)
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserVideos();
  }, []);

  function getVideoIdFromUrl(url) {
    const regex = /[?&]v=([^&]+)/;
    if (url && typeof url === 'string') {
      const match = url.match(regex);
      return match ? match[1] : null;
    }
    return null;
  }

  const nameRef = useRef();
  const episodeRef = useRef();
  const descriptionRef = useRef();
  const originalLinkRef = useRef();
  const materialsRef = useRef();

  async function createVideo() {
    try {
      const response = await videoService.createVideo(
        nameRef.current.value,
        descriptionRef.current.value,
        Number(episodeRef.current.value),
        originalLinkRef.current.value,
        [materialsRef.current.value]
      );
      console.log(response.body);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteVideo(videoId) {
    try {
      const response = await videoService.deleteVideo(videoId);
      console.log(response);
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

      getVideoIdFromUrl={getVideoIdFromUrl}
      dataForUserVideos={userVideos}
      nameRef={nameRef}
      descriptionRef={descriptionRef}
      episodeRef={episodeRef}
      urlRef={originalLinkRef}
      materialsRef={materialsRef}

      onButtonClick={createVideo}
      onDeleteClick={deleteVideo}
    />
  );
}
export default ProfileScreen;