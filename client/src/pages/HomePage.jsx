import styled from 'styled-components';
import VideoList from '../components/VideoList';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 65svh;
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
            <VideoList />
        </>
    );
}
export default HomePage;