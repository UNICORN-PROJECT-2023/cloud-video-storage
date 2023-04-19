import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StyledVideoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 1rem;
  padding: 1rem 2rem;
  margin: 0 auto;
  overflow: hidden;

  .gridItem {
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 25px 80px 0 rgb(22 24 28 / 10%);
    color: black;
    background-color: white;
    .iframeWrapper {
        position: relative;
        padding-top: 56.25%; /* 16:9 aspect ratio */
      }
  
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
  }
  .gridItem:hover {
    box-shadow: 0 25px 80px 0 rgb(22 24 28 / 20%);
  }
  button {
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    border-radius: 5px;
    font-size: 1rem;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
    background-color: red;
    width: 48%;
    margin: 0.2rem;
    
  }
  .editButton {
    background-color: #3c6ca8;
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
    button {
      color: #fff;
      border: none;
      padding: 1rem 2rem;
      margin: 0.2rem;
      border-radius: 5px;
      font-size: 1rem;
      letter-spacing: 1px;
      font-weight: bold;
      cursor: pointer;
      background-color: orange;
      min-width: 200px;
    }
    input{
      padding: 1rem;
      margin-bottom: 1rem;
      border: 2px solid black;
      border-radius: 5px;
      font-size: 1rem;
      min-width: 250px;
    
      &:focus {
        outline: none;
        border: 2px solid #b78fd6;
      }
    }
    ::-ms-reveal {
      border: 1px solid transparent;
      border-radius: 50%;
      box-shadow: 0 0 3px currentColor;
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
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
background-color: white;
@media (max-width: 768px) {
  margin: 0 1rem;
}

input, textarea {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1rem;
  width: 65%;

  &:focus {
    outline: none;
    border: 2px solid cornflowerblue;
  }
}

h1 {
  padding: 1rem;
  font-weight: 1000;
  color: cornflowerblue;
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
const StyledEditForm = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 700px;
padding: 1rem;
font-size: 1.5rem;
margin: 2rem auto 4rem;

@media (max-width: 768px) {
  margin: 0 1rem;
}

input, textarea {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid black;
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
  margin: 0.2rem;
  border-radius: 5px;
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
  background-color: #3c6ca8;
}
`;
const StyledEditUserForm = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 700px;
padding: 1rem;
font-size: 1.5rem;
margin: 2rem auto 4rem;
background-color: white;
border-radius: 1rem;
color: black;

input{
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1rem;
  width: 65%;

  &:focus {
    outline: none;
    border: 2px solid #3c6ca8;
  }
}

button {
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  margin: 0.2rem;
  border-radius: 5px;
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
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
      <StyledEditUserForm>
        {props.userEdit ? (
          <>
            <h1>Edit user data</h1>
            <input type="text" ref={props.editUserNameRef} defaultValue={props.username} placeholder='Username' />
            <input type="text" ref={props.editUserEmailRef} defaultValue={props.email} placeholder='Email' />
            <input type={props.type} ref={props.editUserPasswordRef} placeholder=' New password' />
            <motion.button style={{ padding: '0.2rem', backgroundColor: 'orange' }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => props.showPassword()}>show password</motion.button>
            <div>
              <motion.button whileHover={{ scale: 0.9 }} style={{ backgroundColor: 'green' }} onClick={() => props.editUser() && props.onCancelUserClick}>Confirm</motion.button>
              <motion.button whileHover={{ scale: 0.9 }} style={{ backgroundColor: '#3c6cb9' }} onClick={props.onCancelUserClick}>Cancel</motion.button>
            </div>
            </>
        ) : (
          <>
            <p>USERNAME : {props.username}</p>
            <p>EMAIL : {props.email}</p>
            <motion.button whileHover={{ scale: 0.9 }} style={{backgroundColor: 'orange'}} onClick={props.userEditMode}>Edit user data</motion.button>
            </>
        )}
      </StyledEditUserForm>
      <StyledForm>
        <h1>Create Video</h1>
        <input type="text" ref={props.nameRef} placeholder="Title" />
        <textarea type="text" ref={props.descriptionRef} style={{ width: '65%' }} rows="4" placeholder="Description" />
        <input type="text" ref={props.episodeRef} placeholder="Episode" />
        <input type="text" ref={props.urlRef} placeholder="Url" />
        <input type="text" ref={props.materialsRef} placeholder="Materials" />
        {props.error && <p style={{ color: '#D2122E', fontWeight: '1000' }}>{String(props.error)}</p>}
        <motion.button whileHover={{ scale: 0.9 }} onClick={props.onCreateClick}>Create</motion.button>
      </StyledForm>

      <h1 style={{ textAlign: 'center' }}>My Videos</h1>
      <StyledVideoList >

        {props.dataForUserVideos?.map((video) => (
          <div
            className="gridItem"
            key={video.id}
          > {video.editMode ? (
            <>
              <StyledEditForm>
                <input type="text" ref={props.editNameRef} defaultValue={video.name} placeholder="Title" />
                <textarea type="text" ref={props.editDescriptionRef} defaultValue={video.description} style={{ width: '65%' }} rows="4" placeholder="Description" />
                <input type="text" ref={props.editEpisodeRef} defaultValue={video.episode} placeholder="Episode" />
                <input type="text" ref={props.editUrlRef} defaultValue={video.originalLink} placeholder="Url" />
                <input type="text" ref={props.editMaterialsRef} defaultValue={video.materials} placeholder="Materials" />
                <motion.button className="editButton" style={{ backgroundColor: 'green' }} whileHover={{ scale: 0.9 }} onClick={() => props.updateVideo(video.id)}>Confirm</motion.button>
                <motion.button style={{ backgroundColor: 'red' }} whileHover={{ scale: 0.9 }} onClick={() => props.onCancelClick(video.id)}>Cancel</motion.button>
              </StyledEditForm>
            </>
          ) : (
            <>
              <div className="iframeWrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${props.getVideoIdFromUrl(video.originalLink)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div>
                  <h3>{video.name}</h3>
                  <p>{video.owner.name}</p>
                  <span>created at: {video.createdAt}</span>
                  <p>updated at: {video.updatedAt}</p>
                </div>
              </Link>
              <motion.button className="editButton" whileHover={{ scale: 0.9 }} onClick={() => props.editModeTrue(video.id)}>Edit</motion.button>

              <motion.button whileHover={{ scale: 0.9 }} onClick={() => props.onDeleteClick(video.id)}>DELETE</motion.button>
            </>
          )}
          </div>
        ))}
      </StyledVideoList>

      <h1 style={{ textAlign: 'center' }}>My Video List</h1>
      <StyledVideoList >

        {props.dataForVideoList?.map((video) => (
          <div
            className="gridItem"
            key={video.id}
          >
            <>
              <div className="iframeWrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${props.getVideoIdFromUrl(video.originalLink)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div>
                  <h3>{video.name}</h3>
                  <p>Owner: {video.owner.name}</p>
                  <span>created at: {video.createdAt}</span>
                  <p>updated at: {video.updatedAt}</p>
                </div>
              </Link>
              <motion.button style={{ width: '70%' }} whileHover={{ scale: 0.9 }} onClick={() => props.onDeleteFromList(video.id)}>Remove from List</motion.button>
            </>

          </div>
        ))}
      </StyledVideoList>
    </>
  )
}
export default ProfilePage;