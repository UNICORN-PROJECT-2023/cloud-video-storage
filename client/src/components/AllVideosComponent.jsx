import { useState, useEffect } from "react";
import VideoService from '../services/videoService';
import UserService from '../services/userService';
import DateUtils from '../utils/DateUtils';
import ButtonComponent from '../components/ButtonComponent';
import { Link } from 'react-router-dom';
import GetCategories from '../components/GetCategories'
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledVideoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 1rem;
  padding: 1rem 2rem;
  margin: 0 auto;
  overflow: hidden;

  .gridItem {
    border-radius: 1rem;
    border: 1px solid black;
    padding: 1rem;
    .iframeWrapper {
        position: relative;
        padding-top: 56.25%; /* 16:9 aspect ratio */
      }
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
      }
  }
  button {
    width: 48%;
    transform: translateX(-1.5%);
  }
  .editButton {
    background-color: #3c6ca8;
  }
  h3 {
    margin-top: 1rem;
  }
  p {
    color: grey;
    font-weight: 700;
    font-size: 1.2rem;
  }
  .videoOwner {
    color: #aabbeb;
    letter-spacing: 2px;
  }
`;

export default function AllVideosComponent() {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeCategoryButton, setActiveCategoryButton] = useState(false);

  const videoService = new VideoService();
  const userService = new UserService();

  useEffect(() => {
    fetchVideos();
  }, [])

  async function fetchVideos(categoryId) {
    try {
      const [videos, categories] = await Promise.all([
        videoService.getAllVideos(categoryId),
        videoService.getCategories()
      ]);
      setCategories(categories.body);
      setVideos(videos.body);

      console.log(videos.body);
      console.log(categoryId);

      setActiveCategoryId(categoryId);
      setActiveCategoryButton(!!categoryId);
      // if user is logged in
      const user = await userService.getCurrentUser();
      user && setUser(user.body);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCategoryButtonClick(categoryId) {
    // if the clicked category is the same as the active one, clear the active state
    if (categoryId === activeCategoryId) {
      setActiveCategoryId(null);
      setActiveCategoryButton(false);
      fetchVideos();
    } else {
      setActiveCategoryId(categoryId);
      setActiveCategoryButton(true);
      fetchVideos(categoryId);
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

  async function addToList(id) {
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
    <>
      <div className="filterCategorySection">
        {categories.map((category) => (
            <motion.button
                className="categoryButton"
                key={category.id}
                onClick={() => handleCategoryButtonClick(category.id)}
                style={{ backgroundColor: activeCategoryId === category.id && activeCategoryButton ? '#3c6cb9' : 'transparent' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
              {category.name}
            </motion.button>
        ))}
      </div>
      <StyledVideoList>
        {videos.map((video) => {
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
                  <p className="videoOwner">{video.owner.name}</p>
                  <GetCategories array={video.categories} />
                  <p>Created: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</p>
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
        })}
      </StyledVideoList>
    </>
  );
}
