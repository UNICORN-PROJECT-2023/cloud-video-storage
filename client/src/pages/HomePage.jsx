import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import VideoGrid from '../components/VideoGrid';
import ButtonComponent from '../components/ButtonComponent';
import backgroundImage from '../images/waves.png';
import { ReactComponent as Background } from '../images/wavessvg.svg';

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
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 1000;
    }

    .btn {
        margin: 2rem;
        padding: 1rem 3.5rem;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        border-radius: 0.5rem;
        font-weight: 700;
        letter-spacing: 2px;
       }
      .btn:hover {
        background-position: right center; /* change the direction of the change here */
      }

      .btn-1 {
        background-image: linear-gradient(to right,  #4D3D9A 0%, #813082 50%, #4D3D9A 100%);
      }

`;

function HomePage(props) {
    return (
        <>
            <div className="main" style={{backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '100svh', width: '100%'}} >
                <StyledWrapper >
                    <h1>Welcome to <span>UNITUBE</span></h1>
                    <p>{props.description}</p>
                    <a className="btn btn-1" href='#videos'>Explore</a>
                </StyledWrapper>
            </div>
            <VideoGrid>
                {props.allVideos.map((video) => {
                    const isSubscribed = video?.subscribers?.find((subscriber) => subscriber.id === props?.user?.id);
                    return (
                        <div
                            className="gridItem"
                            style={{ color: 'black' }}
                            key={video.id}
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
                            <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', color: 'white' }}>
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