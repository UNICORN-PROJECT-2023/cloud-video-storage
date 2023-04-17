import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 55vh;

  & .videoDetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    min-width: 85%;
    margin-top: 2rem;
    color: black;
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;
  }

  & iframe {
    width: 100%;
    height: calc(100vh - 360px);
    max-height: 720px;
  }
`;

export default function VideoDetailPage(props) {
  return (
    <StyledWrapper>
      <div className="videoDetail" key={props.videosData?.id}>
        <iframe
          src={`https://www.youtube.com/embed/${props.getVideoIdFromUrl(props.videosData?.originalLink)}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <h3>{props.videosData?.name}</h3>
        <p>{props.videosData?.description}</p>
        <p>Owner: {props.videosData?.owner?.name}</p>
        <span>created at: {props.videosData?.createdAt}</span>
        <p>updated at: {props.videosData?.updatedAt}</p>
      </div>
    </StyledWrapper>
  );
}