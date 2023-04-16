import styled from 'styled-components';
import CreateVideoForm from '../components/CreateVideoForm';
import UsersVideos from '../components/UsersVideos';

const StyledInfo = styled.p`
    display: flex;
    justify-content: flex-start;
`;
const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 1000;

    h1 {
        padding: 1rem;
        font-weight: 1000;
    }
`;

function ProfilePage(props) {

    if (props.loading) {
        return (
            <StyledWrapper>
                <h1>loading...</h1>
            </StyledWrapper>
        )
    }

    // tohle se nespusti pokud je loading true
    return (
        <>
        <StyledWrapper>
            <h1>{props.title}</h1>
            <StyledInfo>
                USERNAME : {props.username}<br />
                EMAIL : {props.email}<br />
            </StyledInfo>
        </StyledWrapper >
        <CreateVideoForm /> 
        <UsersVideos />
        </>

        
    )
}
export default ProfilePage;