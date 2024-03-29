import styled from 'styled-components';
import backgroundImage from '../images/unitubebg.png';
import AllVideosComponent from '../components/AllVideosComponent';
import { useRef } from 'react';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100svh;
    border-radius: 1rem;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    @media (max-width: 768px) {
        padding: 0 2rem;
    }
    @media (max-width: 1920px) {
        background-size: 90%;
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
    const videoRef = useRef(null);
    const scrollToVideos = () => {
        const offset = 150; // velikost navbaru v pixelech
        const elementPosition = videoRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    };
    return (
        <>
            <StyledWrapper >
                <h1>Welcome to <span>UNITUBE</span></h1>
                <p>{props.description}</p>
                <button className="btn btn-1" onClick={scrollToVideos}>Explore</button>
            </StyledWrapper>
                <div ref={videoRef}></div>
            <AllVideosComponent/>
        </>
    );
}
export default HomePage;
