import styled from 'styled-components';
import '../styles/Profile.css';
import '../styles/Category.css';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import ButtonComponent from '../components/ButtonComponent';
import FormComponent from '../components/FormComponent';
import VideoGrid from '../components/VideoGrid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GetCategories from '../components/GetCategories'

const StyledSpan = styled.span`
    background: -webkit-linear-gradient(#C81C5D, #813082, #4D3D9A);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 1000;
`;

function ProfilePage(props) {
  if (props.loading) {
    return (
      <div style={{ minHeight: '100svh' }}>
        <h1>loading...</h1>
      </div>
    )
  }
  // tohle se nespusti pokud je loading true
  return (
    <div style={{ marginTop: '12rem' }}>
      <div className="userProfile">
        <div className="user-details">
          {props.userEdit ? (
            <div className="userEdit">
              <h1>Edit your details</h1>
              <input type="text" ref={props.editUserNameRef} defaultValue={props.username} placeholder='Username' />
              <input type="text" ref={props.editUserEmailRef} defaultValue={props.email} placeholder='Email' />
              <div className="passwordContainer">
                <input type={props.type} ref={props.editUserPasswordRef} style={{ width: '100%' }} placeholder=' New password' />
                {props.passwordVisible ?
                  <i className="eyeIcon" onClick={() => props.showPassword()}>
                    <VisibilityIcon />
                  </i> :
                  <i className="eyeIcon" onClick={() => props.showPassword()}>
                    <VisibilityOffIcon />
                  </i>
                }
              </div>
              <div>
                <div style={{ display: 'flex' }}>
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
              </div>
            </div>
          ) : (
            <>
              <h1>Welcome to your profile, <StyledSpan>{props.username}</StyledSpan></h1>
              <p>Here you can Edit your profile details, create your videos, see your posted videos and see your list of videos.</p>
              <ButtonComponent
                onClick={props.userEditMode}
                text='Edit user data'
                bgColor='orange'
                txtColor='white'
              />
            </>
          )}
        </div>
        <FormComponent>
          <h1>Create Video</h1>
          <input type="text" ref={props.nameRef} placeholder="Title" />
          <textarea type="text" ref={props.descriptionRef} style={{ width: '65%' }} rows="4" placeholder="Description" />
          <input type="text" ref={props.episodeRef} placeholder="Episode" />
          <input type="text" ref={props.urlRef} placeholder="Url" />
          <div className="categorySection">
            {props.dataForCategories.map((category) => (
              <button className="categoryButton" key={category.id} style={category?.isSelected ? { background: "#3c6cb9" } : null} onClick={() => props.onCategoryClick(category.name)}>
                {category.name}
              </button>
            ))}
          </div>
          <input type="text" ref={props.materialsRef} placeholder="Materials" />
          {props.error && <p style={{ color: '#D2122E', fontWeight: '1000' }}>{String(props.error)}</p>}
          <ButtonComponent
            bgColor="#3c6ca8"
            onClick={props.onCreateClick}
            txtColor="white"
            text="Create"
          />
        </FormComponent>
      </div>
      <div className="userVideos">
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
                  <div className="categorySection">
                    {props.dataForUpdatedCategories.map((category) => (
                      <button className="categoryButton" key={category.id} style={category?.isSelected ? { background: "#3c6cb9" } : null} onClick={() => props.onCategoryUpdateClick(category.name)}>
                        {category.name}
                      </button>
                    ))}
                  </div>
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
                <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                  <div>
                    <h3>{video.name}</h3>
                    <p>{video.owner.name}</p>
                    <GetCategories array={video.categories} />
                    <span>Created: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</span>
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
                <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                  <div>
                    <h3>{video.name}</h3>
                    <p>Owner: {video.owner.name}</p>
                    <GetCategories array={video.categories} />
                    <span>Created: {DateUtils.getAgeFromDate(new Date(video.createdAt))} ago</span>
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
      </div>
    </div>
  )
}
export default ProfilePage;
