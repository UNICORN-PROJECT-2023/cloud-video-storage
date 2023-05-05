import styled from "styled-components";
import DateUtils from "../utils/DateUtils";

const StyledWrapper = styled.div`
  .videoDetail {
    padding: 8rem;
    font-size: 1.25rem;
    font-weight: 700;
    width: 100%;
  }
  .videoWrapper {
    margin-top: 2rem;
  }
  iframe {
    width: 100%;
    max-width: 1500px;
    height: 500px;
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
          <h3>{props.videosData?.name}</h3>
          <p>{props.videosData?.description}</p>
          <p>Owner: {props.videosData?.owner?.name}</p>
          <p>Created: {DateUtils.getAgeFromDate(new Date(props.videosData?.createdAt))} ago</p>
          <p>Updated: {DateUtils.getAgeFromDate(new Date(props.videosData?.createdAt))} ago</p>
      </div>
    </StyledWrapper>
  );
}
