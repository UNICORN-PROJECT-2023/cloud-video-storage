import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledVideoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 1rem;
  padding: 1rem 2rem;
  margin: 0 auto;
  overflow: hidden;

  .gridItem {
    border-radius: 1rem;
    color: black;
    padding: 1rem;
    background-color: white;
    box-shadow: 0 25px 80px 0 rgb(22 24 28 / 10%);
  }
  .gridItem:hover {
    box-shadow: 0 25px 80px 0 rgb(22 24 28 / 20%);
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
    background-color: red;
  }
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
const StyledForm = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 700px;
padding: 1rem;
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
                    USERNAME : {props.username}<br />
                    EMAIL : {props.email}<br />
            </StyledWrapper >
            
            <StyledForm>
                <h1>Create Video</h1>
                <input type="text" ref={props.nameRef} placeholder="Title" />
                <textarea type="text" ref={props.descriptionRef} style={{ width: '65%' }} rows="4" placeholder="Description" />
                <input type="text" ref={props.episodeRef} placeholder="Episode" />
                <input type="text" ref={props.urlRef} placeholder="Url" />
                <input type="text" ref={props.materialsRef} placeholder="Materials" />
                <motion.button whileHover={{ scale: 0.9 }} onClick={props.onButtonClick}>Create</motion.button>
            </StyledForm>
            <StyledVideoList>
                {props.dataForUserVideos.map((video) => (
                    <div
                        className="gridItem"
                        key={video.id}
                    >
                        <h3>{video.name}</h3>
                        <p>{video.description}</p>
                        <a href={video.originalLink}>{video.originalLink}</a>
                        <p>Owner: {video.owner.name}</p>
                        <span>created at: {video.createdAt}</span>
                        <p>updated at: {video.updatedAt}</p>
                        <motion.button whileHover={{ scale: 0.9 }} onClick={ () => props.onDeleteClick(video.id)}>DELETE</motion.button>
                    </div>
                ))}
            </StyledVideoList>
        </>
    )
}
export default ProfilePage;