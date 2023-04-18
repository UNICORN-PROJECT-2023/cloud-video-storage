import { useEffect, useState, useRef } from 'react';
import ProfilePage from '../pages/ProfilePage';
import UserService from '../services/userService';
import VideoService from '../services/videoService';

function ProfileScreen() {
  const userService = new UserService();
  const videoService = new VideoService();
  const [loading, setLoading] = useState(false);
  const [userVideos, setUserVideos] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [error, setError] = useState(null);
  
  // TODO přejmenovat na user
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
    fetchUserVideos();
  }, []);

  useEffect(() => {
    fetchVideoList();
  }, []);

  async function fetchUserVideos() {
    try {
      const userVideos = await videoService.getUserVideos();
      setUserVideos(userVideos.body);
      console.log(userVideos)
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchVideoList() {
    try {
      const userVideoList = await videoService.getVideoList();
      setVideoList(userVideoList.body);
      console.log(userVideoList);
    } catch (error) {
      console.log(error);
    }
  }
 

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

  const editNameRef = useRef();
  const editEpisodeRef = useRef();
  const editDescriptionRef = useRef();
  const editOriginalLinkRef = useRef();
  const editMaterialsRef = useRef();

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
      await fetchUserVideos();
    } catch (error) {
      setError(error)
    }
  }

  async function updateVideo(videoId) {
    try {
      await videoService.updateVideo(
        videoId,
        editNameRef.current.value,
        editDescriptionRef.current.value,
        Number(editEpisodeRef.current.value),
        editOriginalLinkRef.current.value,
        [editMaterialsRef.current.value]
      );
      await fetchUserVideos();
      onCancelClick();
    } catch (error) {
      console.log(error);
    }
  }

  function editMode(id) {
    setUserVideos((userVideos) => 
      userVideos.map((video) => {
        if (video.id === id) {
          video.editMode = true;
          return video;
        }
        video.editMode = false;
        return video;
      })
    );
  }

  function onCancelClick() {
    setUserVideos((userVideos) => 
      userVideos.map((video) => {
        video.editMode = false;
        return video;
      })
    );
  }

  async function deleteVideo(videoId) {
    try {
      const response = await videoService.deleteVideo(videoId);
      console.log(response);
      await fetchUserVideos();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteVideoFromList(videoId) {
    try {
      const response = await videoService.deleteVideoList(videoId);
      console.log(response);
      await fetchVideoList();
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
      error={error}
      getVideoIdFromUrl={getVideoIdFromUrl}
      dataForUserVideos={userVideos}
      dataForVideoList={videoList}
      nameRef={nameRef}
      descriptionRef={descriptionRef}
      episodeRef={episodeRef}
      urlRef={originalLinkRef}
      materialsRef={materialsRef}
      editNameRef={editNameRef}
      editDescriptionRef={editDescriptionRef}
      editEpisodeRef={editEpisodeRef}
      editUrlRef={editOriginalLinkRef}
      editMaterialsRef={editMaterialsRef}
      updateVideo={updateVideo}
      editModeTrue={editMode}
      onCancelClick={onCancelClick}
      onButtonClick={createVideo}
      onEditClick={updateVideo}
      onDeleteClick={deleteVideo}
      onDeleteFromList={deleteVideoFromList}
    />
  );
}
export default ProfileScreen;