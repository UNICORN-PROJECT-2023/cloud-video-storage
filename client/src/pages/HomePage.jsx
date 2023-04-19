import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import VideoGrid from '../components/VideoGrid';
import ButtonComponent from '../components/ButtonComponent';
import video from '../images/video.mp4'

import Model from '../model/Model';
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100svh;
    border-radius: 1rem;
    
    @media (max-width: 768px) {
        padding: 0 2rem;
    }

    h1 {
        font-size: 4rem;
        margin-bottom: 1rem;
        @media (max-width: 768px) {
            font-size: 3.3rem;
        }
    }

    p {
        color: rgb(235, 222, 222);
        font-weight: 700;
        font-size: 2rem;
        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    }

    span{
        background: -webkit-linear-gradient(#C81C5D, #813082, #4D3D9A);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        width: 300px;
        margin: 0 auto;
      }

    .btn {
        flex: 1 1 auto;
        margin: 10px;
        padding: 20px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
       /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
        border-radius: 10px;
       }
  
      
      .btn:hover {
        background-position: right center; /* change the direction of the change here */
      }

      .btn-1 {
        background-image: linear-gradient(to right,  #4D3D9A 0%, #813082 50%, #4D3D9A 100%);
      }

      .video-section {
        position: relative;
        /* Other styles go here */
      }
      
      .video-section video {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
      }

      .main{
        height: 100svh;
        width: 100%;
        background-image: url('../images/waves.svg');
      }
      
`;

function HomePage(props) {

    return (
        <>
            <div className="main">
                <StyledWrapper>
                    <h1>Welcome to <span style={{ color: "#eae164", fontWeight: '1000' }}>UNITUBE</span></h1>
                    <p>{props.description}</p>
                    <div className='container'>
                        <a className="btn btn-1" href='#videos'>Explore</a>
                    </div>

                </StyledWrapper>
            </div>



            <VideoGrid >

                {props.allVideos.map((video) => {
                    const isSubscribed = video?.subscribers?.find((subscriber) => subscriber.id === props?.user?.id);
                    console.log(isSubscribed);
                    return (

                        <div
                            className="gridItem"
                            style={{ color: 'black' }}
                            key={video.id}
                            id='videos'

                        >
                            <div className="iframeWrapper" >
                                <iframe
                                    src={`https://www.youtube.com/embed/${props.getVideoIdFromUrl(video.originalLink)}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="picture-in-picture;"
                                    allowFullScreen
                                />
                            </div>
                            <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <div>
                                    <h3>{video.name}</h3>
                                    <p>Owner: {video.owner.name}</p>
                                    <span>Created: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</span>
                                    <p>Updated: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</p>

                                </div>
                            </Link>

                            {(props.isLoggedIn()) ?
                                isSubscribed
                                    ? <ButtonComponent
                                        bgColor="red"
                                        onClick={() => props.onDeleteFromList(video.id)}
                                        txtColor="white"
                                        text="Delete from list"
                                    />
                                    : <ButtonComponent
                                        bgColor="#3c6ca8"
                                        onClick={() => props.addToList(video.id)}
                                        txtColor="white"
                                        text="Add to list"
                                    />
                                : null
                            }
                        </div>
                    )
                })}
            </VideoGrid>
        </>
    );
}
export default HomePage;