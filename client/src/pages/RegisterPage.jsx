import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

const StyledWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 70svh;
max-width: 700px;
font-size: 1.5rem;
margin: 0 auto;
border-radius: 1rem;
backdrop-filter: blur(50px);
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

@media (max-width: 768px) {
  margin: 0 1rem;
}
  input {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 2px solid white;
    border-radius: 5px;
    font-size: 1rem;
    width: 65%;

    &:focus {
      outline: none;
      border: 2px solid #b78fd6;
    }
  }

  h1 {
    padding: 1rem;
    font-weight: 1000;
    color: #eae164;
  }

  button {
    background-color: black;
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10rem 10rem 10rem 0;
    font-size: 1rem;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
    background-color: #3c6ca8;
  }
  p {
    color: rgb(235, 222, 222);
    font-size: 1.2rem;
  }
`;

function RegisterPage(props) {
    return (
        <StyledWrapper>
            <h1>{props.title}</h1>
            <input ref={props.emailInput}  type="email" placeholder="Email" />
            <input ref={props.usernameInput} type="text" placeholder="Username" />
            <input ref={props.passwordInput} type="password" placeholder="Password" />
            {props.error && <p>{String(props.error)}</p>}
            <p>If you already have an account <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>Login here</Link></p>
            <motion.button whileHover={{scale: 0.9}} onClick={props.onButtonClick}>{props.buttonText}</motion.button>
        </StyledWrapper>
    );
}
export default RegisterPage;