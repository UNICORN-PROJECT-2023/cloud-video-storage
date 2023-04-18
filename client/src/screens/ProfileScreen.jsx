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
  const [userEdit, setUserEdit] = useState(false);
  
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
      videoService.createVideo(
        nameRef.current.value,
        descriptionRef.current.value,
        Number(episodeRef.current.value),
        originalLinkRef.current.value,
        [materialsRef.current.value]
      );
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      episodeRef.current.value = "";
      originalLinkRef.current.value = "";
      materialsRef.current.value = "";
      console.log(fetchUserVideos());
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

  const editUserNameRef = useRef();
  const editUserEmailRef = useRef();
  const editUserPasswordRef = useRef();

  async function editProfile() {
    try {
      await userService.editUser(
        editUserNameRef.current.value,
        editUserEmailRef.current.value,
        editUserPasswordRef.current.value
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function userEditMode () {
    setUserEdit(true);
  }

  function onCancelUserClick() {
    setUserEdit(false);
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

      editUserNameRef={editUserNameRef}
      editUserEmailRef={editUserEmailRef}
      editUserPasswordRef={editUserPasswordRef}
      editUser = {editProfile}
      userEdit = {userEdit}
      userEditMode = {userEditMode}
      onCancelUserClick = {onCancelUserClick}

      editNameRef={editNameRef}
      editDescriptionRef={editDescriptionRef}
      editEpisodeRef={editEpisodeRef}
      editUrlRef={editOriginalLinkRef}
      editMaterialsRef={editMaterialsRef}

      updateVideo={updateVideo}
      editModeTrue={editMode}
      onCancelClick={onCancelClick}
      onCreateClick={createVideo}
      onEditClick={updateVideo}
      onDeleteClick={deleteVideo}
      onDeleteFromList={deleteVideoFromList}
    />
  );
}
export default ProfileScreen;