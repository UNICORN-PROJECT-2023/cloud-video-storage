import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-size: 1.5rem;
`;

function HomePage(props) {
    return (
        <StyledWrapper>
            <h1>{props.title}</h1>
            <p>Home page</p>
            <Link to={props.link}>
                <button>Route</button>
            </Link>
            <button onClick={props.onButtonClick}>click me</button>
        </StyledWrapper>
    );
}
export default HomePage;