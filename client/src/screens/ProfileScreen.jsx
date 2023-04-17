import { useEffect, useState, useRef } from 'react';
import ProfilePage from '../pages/ProfilePage';
import UserService from '../services/userService';
import VideoService from '../services/videoService';

function ProfileScreen() {
  const userService = new UserService();
  const videoService = new VideoService();
  const [loading, setLoading] = useState(false);
  const [userVideos, setUserVideos] = useState([]);
  
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
    } catch (error) {
      console.log(error);
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
      // on success
      onCancelClick();
      updateById({
        videoId: videoId,
        name: editNameRef.current.value,
        description: editDescriptionRef.current.value,
        episode: editEpisodeRef.current.value,
        originalLink: editOriginalLinkRef.current.value,
        materials: editMaterialsRef.current.value
      }, videoId);
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

  function updateById(video, id) {
    setUserVideos((userVideos) => 
      userVideos.map((tempVideo) => {
        if (tempVideo.id === id) {
          tempVideo.name = video.name;
          tempVideo.description = video.description;
          tempVideo.episode = video.episode;
          tempVideo.originalLink = video.originalLink;
          tempVideo.materials = video.materials;
          return tempVideo;
        }

        return tempVideo;
      })
    );
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
    />
  );
}
export default ProfileScreen;