import HomePage from '../pages/HomePage';
import { useEffect, useState } from 'react';
import VideoService from '../services/videoService';
import UserService from '../services/userService';

function HomeScreen() {
    const [user, setUser] = useState({});
    const [videos, setVideos] = useState([]);
    const userService = new UserService();
    const videoService = new VideoService();
  

    function isLoggedIn() {
      return localStorage.getItem('token') ? true : false;
    }

    useEffect(() => {
      fetchVideos();
    }, []);

    async function fetchVideos() {
      try {
        const allVideos = await videoService.getAllVideos();
        setVideos(allVideos.body);

        // if user is logged in
        const user = await userService.getCurrentUser();
        user && setUser(user.body);
      } catch (error) {
        console.error(error);
      }
    }

    async function deleteVideoFromList(videoId) {
      try {
        const response = await videoService.deleteVideoList(videoId);
        console.log(response);
        await fetchVideos();
      } catch (error) {
        console.log(error);
      }
    }
  
    async function addToList(id){
      try {
        const userVideos = await videoService.addVideoList(id);
        await fetchVideos();
        console.log(userVideos)
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

    return(
        <HomePage
        description="This is a video sharing platform where you can share your videos with the world."
        allVideos={videos}
        user={user}
        addToList={addToList}
        getVideoIdFromUrl={getVideoIdFromUrl}
        isLoggedIn={isLoggedIn}
        onDeleteFromList={deleteVideoFromList}
        />
    );
}
export default HomeScreen;