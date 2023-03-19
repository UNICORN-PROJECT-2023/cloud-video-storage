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

function TestPage(props) {
    return (
        <StyledWrapper>
            <h1>{props.title}</h1>
            <Link to={props.link}>
                <button>Route</button>
            </Link>
            <button onClick={props.onButtonClick}>{props.buttonText}</button>
            <div className="data">
                {props.data}
            </div>
        </StyledWrapper>
    );
}
export default TestPage;