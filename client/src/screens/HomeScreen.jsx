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
        getVideoIdFromUrl={getVideoIdFromUrl}
        />
    );
}
export default HomeScreen;