import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

const StyledWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 100svh;
max-width: 700px;
font-size: 1.5rem;
margin: 0 auto;

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
    background: -webkit-linear-gradient(#C81C5D, #813082, #4D3D9A);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 1000;
  }

  button {
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
    background-image: linear-gradient(#C81C5D, #813082, #4D3D9A);
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
            <input ref={props.emailInput} type="text" name='email' placeholder="Email" />
            <input ref={props.usernameInput} type="text" name='username' placeholder="Username" />
            <input ref={props.passwordInput} type="password" name='password' placeholder="Password" />
            {props.error && <p style={{color: '#D2122E', fontWeight: '1000'}}>{String(props.error)}</p>}
            <p>If you already have an account <Link to="/login" style={{textDecoration: 'none', color: '#6c7482'}}>Login here</Link></p>
            <motion.button whileHover={{scale: 0.9}} onClick={props.onButtonClick}>{props.buttonText}</motion.button>
        </StyledWrapper>
    );
}
export default RegisterPage;
