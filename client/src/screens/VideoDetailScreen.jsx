import VideoDetailPage from "../pages/VideoDetailPage";
import { useParams } from "react-router-dom";
import VideoService from "../services/videoService";
import { useEffect, useState } from "react";

export default function VideoDetailScreen() {
    const { id } = useParams();
    const videoService = new VideoService();
    const [video, setVideo] = useState({
        
    });

    useEffect(() => {
        async function fetchVideo() {
            try {
                const video = await videoService.getVideo(id);
                setVideo(video.body);
            } catch (error) {
                console.error(error);
            }
        }
        fetchVideo();
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
        <VideoDetailPage
        videosData={video}
        getVideoIdFromUrl={getVideoIdFromUrl}
        />
    );
}