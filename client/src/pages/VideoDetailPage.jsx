import styled from "styled-components";
import DateUtils from "../utils/DateUtils";

const StyledWrapper = styled.div`
  .videoDetail {
    display: flex;
    flex-direction: column;
    padding: 8rem;
    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  }
  .videoWrapper {
    margin-top: 2rem;
  }
  iframe {
    width: 100%;
    max-width: 1500px;
    height: 500px;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }
  p {
    font-size: 1.35rem;
  }
`;

export default function VideoDetailPage(props) {
  return (
    <StyledWrapper>
      <div className="videoDetail" key={props.videosData?.id}>
        <div className="videoWrapper">
          <iframe
            src={`https://www.youtube.com/embed/${props.getVideoIdFromUrl(props.videosData?.originalLink)}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <h1>{props.videosData?.name}</h1>
        <p>{props.videosData?.description}</p>
        <p>Owner: {props.videosData?.owner?.name}</p>
        <p>Materials: {props.videosData?.materials}</p>
        <p>Created: {DateUtils.getAgeFromDate(new Date(props.videosData?.createdAt))} ago</p>
      </div>
    </StyledWrapper>
  );
}
