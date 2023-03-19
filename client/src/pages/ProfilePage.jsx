import styled from 'styled-components';

const StyledInfo = styled.p`
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
`;
const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-size: 1.5rem;
`;

function ProfilePage(props) {

    if (props.loading) {
        return (
            <p>loading...</p>
        )
    }

    // tohle se nespusti pokud je loading true
    return (
        <StyledWrapper className="profile-wrapper">
            <h1>{props.title}</h1>
            <StyledInfo>
                email: {props.email}<br />
                username: {props.username}<br />
                password: {props.password}<br />
            </StyledInfo>
        </StyledWrapper>
    )
}
export default ProfilePage;