import {useEffect, useRef, useState} from 'react';
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
  const [type, setType] = useState("password");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [categories, setCategories] = useState([]);
  const [updateCategories, setUpdateCategories] = useState([]);

  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
  });

  async function getUser() {
    setLoading(true);
    const user = await userService.getCurrentUser();
    setUser({
      id: user.body.id,
      username: user.body.username,
      email: user.body.email,
    });
    setLoading(false);
  }

  useEffect(() => {
    getUser();
    fetchUserVideos();
    fetchVideoList();
    fetchCategories();
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
 
  async function fetchCategories() {
    try {
      const categories = await videoService.getCategories();
      const updatedCategories = await videoService.getCategories();
      setCategories(categories.body);
      setUpdateCategories(updatedCategories.body);
    } catch (error) {
      console.error(error);
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
      await videoService.createVideo(
        nameRef.current.value,
        descriptionRef.current.value,
        Number(episodeRef.current.value),
        originalLinkRef.current.value,
        [materialsRef.current.value],
        categories
            .filter((category) => category.isSelected)
            .map((category) => ({name: category.name})
        )
      );
      await fetchUserVideos()
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      episodeRef.current.value = "";
      originalLinkRef.current.value = "";
      materialsRef.current.value = "";
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
        [editMaterialsRef.current.value],
        updateCategories
        .filter((category) => category.isSelected)
        .map((category) => ({name: category.name})
    )
      );
      await fetchUserVideos();
      onCancelClick();
    } catch (error) {
      console.log(error);
    }
  }

  function editMode(id) {
    setUpdateCategories((categories) => {
        return categories.map((category) => {
            category.isSelected = false;
            return category;
        });
    })

    setUserVideos((userVideos) => 
      userVideos.map((video) => {
        if (video.id === id) {
          video.editMode = true;
          console.log(video);
          video.categories.forEach((category) => {
            OnCategoryUpdateClick(category.name);
            console.log(category.name)
          })
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

  function showPassword() {
    if (type === "password") {
      setType("text");
      setPasswordVisible(true);
    } else {
      setType("password");
      setPasswordVisible(false);
    }
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

  async function onCategoryClick(name) {
    setCategories((createCategories) => {
      // remove category from array
      if(createCategories.find((category) => category.name === name && category.isSelected === true)) {
        return createCategories.map((category) => {
          if (category.name === name) {
            category.isSelected = false;
            return category
          }
          return category
        })
      }
      // add category to array
      if(createCategories.filter((category) => category.isSelected === true).length < 3) {
        return createCategories.map((category) => {
          if (category.name === name) {
            category.isSelected = true;
            return category
          }
          return category
        })
      }

      return createCategories;
    });
  }

  function OnCategoryUpdateClick(name) {
    setUpdateCategories((updateCategories) => {
      // remove category from array
      if(updateCategories.find((category) => category.name === name && category.isSelected === true)) {
        return updateCategories.map((category) => {
          if (category.name === name) {
            category.isSelected = false;
            return category
          }
          return category
        })
      }
      // add category to array
      if(updateCategories.filter((category) => category.isSelected === true).length < 3) {
        return updateCategories.map((category) => {
          if (category.name === name) {
            category.isSelected = true;
            return category
          }
          return category
        })
      }

      return updateCategories;
    });
  }

  return (
    <ProfilePage
      loading={loading}
      username={user.username}
      email={user.email}
      error={error}
      getVideoIdFromUrl={getVideoIdFromUrl}
      dataForUserVideos={userVideos}
      dataForUpdatedCategories = {updateCategories}
      dataForCategories = {categories}
      dataForVideoList={videoList}

      nameRef={nameRef}
      descriptionRef={descriptionRef}
      episodeRef={episodeRef}
      urlRef={originalLinkRef}
      materialsRef={materialsRef}

      editUserNameRef={editUserNameRef}
      editUserEmailRef={editUserEmailRef}
      editUserPasswordRef={editUserPasswordRef}
      type = {type}
      showPassword = {showPassword}
      passwordVisible = {passwordVisible}
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

      onCategoryUpdateClick={OnCategoryUpdateClick}
      onCategoryClick={onCategoryClick}
    />
  );
}
export default ProfileScreen;
