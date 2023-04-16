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
    color: black;
    padding: 1rem;
    background-color: white;
    box-shadow: 0 25px 80px 0 rgb(22 24 28 / 10%);
  }
  .gridItem:hover {
    box-shadow: 0 25px 80px 0 rgb(22 24 28 / 20%);
    cursor: pointer;
  }
  .description {
    color: #28282B;
  }
  h3 {
    font-weight: 1000;
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
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="gridItem"
                            key={video.id}
                        >
                            <h3>{video.name}</h3>
                            <p className="description">{video.description}</p>
                            <a href={video.originalLink}>{video.originalLink}</a>
                            <p>Create by: {video.owner.name}</p>
                            <span>created at: {video.createdAt}</span>
                            <p>updated at: {video.updatedAt}</p>
                        </motion.div>
                ))}
            </StyledVideoList>
        </>
    );
}
export default HomePage;