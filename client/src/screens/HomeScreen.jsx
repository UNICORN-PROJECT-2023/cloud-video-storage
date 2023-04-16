import HomePage from '../pages/HomePage';
import { useEffect, useState } from 'react';
import VideoService from '../services/videoService';

function HomeScreen() {

    const [videos, setVideos] = useState([]);
    const videoService = new VideoService();
  
    useEffect(() => {
      async function fetchVideos() {
        try {
          const allVideos = await videoService.getAllVideos();
          setVideos(allVideos.body);
        } catch (error) {
          console.error(error);
        }
      }
      fetchVideos();
    }, []);

    return(
        <HomePage
        description="This is a video sharing platform where you can share your videos with the world."
        allVideos={videos}
        />
    );
}
export default HomeScreen;