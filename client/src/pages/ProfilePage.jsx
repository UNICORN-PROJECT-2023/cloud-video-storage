import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import ButtonComponent from '../components/ButtonComponent';
import FormComponent from '../components/FormComponent';
import VideoGrid from '../components/VideoGrid';

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
      <FormComponent>
        {props.userEdit ? (
          <>
            <h1>Edit user data</h1>
            <input type="text" ref={props.editUserNameRef} defaultValue={props.username} placeholder='Username' />
            <input type="text" ref={props.editUserEmailRef} defaultValue={props.email} placeholder='Email' />
            <input type={props.type} ref={props.editUserPasswordRef} placeholder=' New password' />
            <ButtonComponent 
              bgColor="orange" 
              onClick={() => props.showPassword()}
              txtColor="white"
              text="Show password"
              padding="0.2rem"
            />
            <div>
              <ButtonComponent 
                bgColor="green" 
                onClick={() => props.editUser() && props.onCancelUserClick}
                txtColor="white"
                text="Save"
                />
              <ButtonComponent 
                bgColor="#3c6cb9" 
                txtColor="white"
                text="Cancel"
                onClick={props.onCancelUserClick}
              />
            </div>
            </>
        ) : (
          <>
            <p>USERNAME : {props.username}</p>
            <p>EMAIL : {props.email}</p>
            <ButtonComponent  
              onClick={props.userEditMode}
              text='Edit user data'
              bgColor='orange'
              txtColor='white'
            />
            </>
        )}
      </FormComponent>
      <FormComponent>
        <h1>Create Video</h1>
        <input type="text" ref={props.nameRef} placeholder="Title" />
        <textarea type="text" ref={props.descriptionRef} style={{ width: '65%' }} rows="4" placeholder="Description" />
        <input type="text" ref={props.episodeRef} placeholder="Episode" />
        <input type="text" ref={props.urlRef} placeholder="Url" />
        <input type="text" ref={props.materialsRef} placeholder="Materials" />
        {props.error && <p style={{ color: '#D2122E', fontWeight: '1000' }}>{String(props.error)}</p>}
        <ButtonComponent
          bgColor="#3c6ca8" 
          onClick={props.onCreateClick}
          txtColor="white"
          text="Create"
        />
      </FormComponent>

      <h1 style={{ textAlign: 'center' }}>My Videos</h1>
      <VideoGrid>
        {props.dataForUserVideos?.map((video) => (
          <div
            className="gridItem"
            key={video.id}
          > {video.editMode ? (
            <>
              <FormComponent>
                <input type="text" ref={props.editNameRef} defaultValue={video.name} placeholder="Title" />
                <textarea type="text" ref={props.editDescriptionRef} defaultValue={video.description} style={{ width: '65%' }} rows="4" placeholder="Description" />
                <input type="text" ref={props.editEpisodeRef} defaultValue={video.episode} placeholder="Episode" />
                <input type="text" ref={props.editUrlRef} defaultValue={video.originalLink} placeholder="Url" />
                <input type="text" ref={props.editMaterialsRef} defaultValue={video.materials} placeholder="Materials" />
                <ButtonComponent 
                  bgColor="green"
                  onClick={() => props.updateVideo(video.id)}
                  txtColor="white"
                  text="Save"
                />
                <ButtonComponent 
                  bgColor="red" 
                  onClick={() => props.onCancelClick(video.id)}
                  txtColor="white"
                  text="Cancel"
                />
              </FormComponent>
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
                  <span>Created: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</span>
                  <p>Updated: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</p>
                </div>
              </Link>
              <ButtonComponent 
                bgColor="#3c6ca8" 
                onClick={() => props.editModeTrue(video.id)}
                txtColor="white"
                text="Edit"
              />
              <ButtonComponent 
                bgColor="red"
                onClick={() => props.onDeleteClick(video.id)}
                txtColor="white"
                text="Delete"
              />
            </>
          )}
          </div>
        ))}
      </VideoGrid>

      <h1 style={{ textAlign: 'center' }}>My Video List</h1>
      <VideoGrid>

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
                  <span>Created: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</span>
                  <p>Updated: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</p>
                </div>
              </Link>
              <ButtonComponent 
                onClick={() => props.onDeleteFromList(video.id)}
                bgColor="red"
                txtColor="white"
                text="Remove from list"
              />
            </>

          </div>
        ))}
      </VideoGrid>
    </>
  )
}
export default ProfilePage;
