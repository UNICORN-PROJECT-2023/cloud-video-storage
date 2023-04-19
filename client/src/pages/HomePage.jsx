import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const StyledVideoList = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
grid-gap: 1rem;
padding: 1rem 2rem;
margin: 0 auto;
overflow: hidden;
  .gridItem {
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 25px 80px 0 rgb(22 24 28 / 10%);
    background-color: white;
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
      }
  }
  .gridItem:hover {
    box-shadow: 0 25px 80px 0 rgb(22 24 28 / 20%);
    cursor: pointer;
  }
  .description {
    font-weight: 1000;
  }
  h3 {
    font-weight: 1000;
  }

  button {
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    margin: 0.2rem;
    border-radius: 10rem;
    font-size: 1rem;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
    background-color: #3c6ca8;
    
  }
`;

function HomePage(props) {
    return (
        <>
            <StyledWrapper>
                <h1>Welcome to <span style={{ color: "#eae164", fontWeight: '1000' }}>UNITUBE</span></h1>
                <p>{props.description}</p>
            </StyledWrapper>
            <StyledVideoList>
                {props.allVideos.map((video) => (

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
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                        <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div>
                                <h3>{video.name}</h3>
                                <p>Owner: {video.owner.name}</p>
                                <span>created at: {video.createdAt}</span>
                                <p>updated at: {video.updatedAt}</p>

                            </div>
                        </Link>
                        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={() => props.addToList(video.id)}>Add to list</motion.button>


                    </div>
                ))}
            </StyledVideoList>
        </>
    );
}
export default HomePage;