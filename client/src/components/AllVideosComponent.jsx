import { useState, useEffect } from "react";
import VideoService from '../services/videoService';
import UserService from '../services/userService';
import DateUtils from '../utils/DateUtils';
import ButtonComponent from '../components/ButtonComponent';
import { Link } from 'react-router-dom';

export default function AllVideosComponent() {
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState({});
    const videoService = new VideoService();
    const userService = new UserService();


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

    function getVideoIdFromUrl(url) {
        const regex = /[?&]v=([^&]+)/;
        if (url && typeof url === 'string') {
            const match = url.match(regex);
            return match ? match[1] : null;
        }
        return null;
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

    function isLoggedIn() {
        return localStorage.getItem('token') ? true : false;
    }

    return (
            videos.map((video) => {
                const isSubscribed = video?.subscribers?.find((subscriber) => subscriber.id === user?.id);
                return (
                    <div
                        className="gridItem"
                        style={{ color: 'black' }}
                        key={video.id}
                    >
                        <div className="iframeWrapper" >
                            <iframe
                                src={`https://www.youtube.com/embed/${getVideoIdFromUrl(video.originalLink)}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="picture-in-picture;"
                                allowFullScreen
                            />
                        </div>
                        <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                            <div>
                                <h3>{video.name}</h3>
                                <p>Owner: {video.owner.name}</p>
                                <span>Created: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</span>
                                <p>Updated: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</p>

                            </div>
                        </Link>
                        {isLoggedIn() ?
                            isSubscribed
                                ? <ButtonComponent
                                    bgColor="red"
                                    onClick={() => deleteVideoFromList(video.id)}
                                    txtColor="white"
                                    text="Delete from list"
                                />
                                : <ButtonComponent
                                    bgColor="#3c6ca8"
                                    onClick={() => addToList(video.id)}
                                    txtColor="white"
                                    text="Add to list"
                                />
                            : null
                        }
                    </div>
                )
            })
        
    );
}