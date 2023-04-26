import styled from "styled-components";
import DateUtils from "../utils/DateUtils";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .videoDetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8rem;
    font-size: 1.25rem;
    font-weight: 700;
    width: 100%;
  }

  & .videoWrapper {
    position: relative;
    margin-top: 2rem;
    height: 27.5rem;
  }

  & iframe {
    width: 100%;
    height: 100%;
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
          <span>Created: {DateUtils.getAgeFromDate(new Date(props.videosData?.createdAt))} ago</span>
          <p>Updated: {DateUtils.getAgeFromDate(new Date(props.videosData?.createdAt))} ago</p>
        </div>
      </StyledWrapper>
  );
}
