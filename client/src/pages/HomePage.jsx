import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import VideoGrid from '../components/VideoGrid';
import ButtonComponent from '../components/ButtonComponent';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 54svh;
    border-radius: 1rem;
    backdrop-filter: blur(50px);

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
`;

function HomePage(props) {
    return (
        <>
            <StyledWrapper>
                <h1>Welcome to <span style={{ color: "#eae164", fontWeight: '1000' }}>UNITUBE</span></h1>
                <p>{props.description}</p>
            </StyledWrapper>
            <VideoGrid>
                {props.allVideos.map((video) => {
                    const isSubscribed = video?.subscribers?.find((subscriber) => subscriber.id === props?.user?.id);
                    console.log(isSubscribed);
                    return (

                    <div
                        className="gridItem"
                        style={{ color: 'black' }}
                        key={video.id}
                    >
                        <div className="iframeWrapper">
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
                            ?   <ButtonComponent
                                    bgColor="red"
                                    onClick={() => props.onDeleteFromList(video.id)}
                                    txtColor="white"
                                    text="Delete from list"
                                />
                            :   <ButtonComponent 
                                    bgColor="#3c6ca8"
                                    onClick={() => props.addToList(video.id)}
                                    txtColor="white"
                                    text="Add to list"
                                />
                         : null   
                        }
                    </div>
                )})}
            </VideoGrid>
        </>
    );
}
export default HomePage;