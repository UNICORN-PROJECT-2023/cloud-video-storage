import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 35svh;
max-width: 700px;
font-size: 1.5rem;
margin: 2rem auto 4rem;
border-radius: 1rem;
backdrop-filter: blur(50px);
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

@media (max-width: 768px) {
  margin: 0 1rem;
}

input, textarea {
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
`;

function CreateVideoForm() {
    return (
        <StyledForm>
            <h1>Create Video</h1>
            <input type="text" placeholder="Title" />
            <textarea type="text" style={{width: '65%'}} rows="4" placeholder="Description" />
            <input type="text" placeholder="Url" />
            <motion.button whileHover={{ scale: 0.9 }}>Create</motion.button>
        </StyledForm>

    );
}
export default CreateVideoForm;