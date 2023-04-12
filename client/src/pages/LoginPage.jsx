import styled from 'styled-components';
import {motion} from 'framer-motion';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 500px;
  font-size: 1.5rem;
  margin: 0 auto;

  input {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 2px solid white;
    border-radius: 5px;
    font-size: 1rem;
    width: 25rem;

    &:focus {
      outline: none;
      border: 2px solid #b78fd6;
    }
  }

  h1 {
    padding: 1rem;
    font-weight: 1000;
  }

  button {
    background-color: black;
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10rem 10rem 10rem 0;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    background-color: #3c6ca8;
    &:hover {
      background-color: #3c6ca2;
    }
  }
`;

function LoginPage(props) {
    return (
        <StyledWrapper>
            <h1>{props.title}</h1>
            <input ref={props.emailInput}  type="email" placeholder="Email" />
            <input ref={props.passwordInput} type="password" placeholder="Password" />
            <motion.button whileHover={{scale: 0.9}} onClick={props.onButtonClick}>{props.buttonText}</motion.button>
        </StyledWrapper>
    );
}
export default LoginPage;