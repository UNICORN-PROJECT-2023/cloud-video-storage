export default function VideoDetailPage(props) {
    return (
        <div>
            <iframe width="420" height="236" src="https://www.youtube.com/embed/SiY6QwTJyoI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            <div
                className="gridItem"
                key={props.videosData?.id}
            >
                <h3>{props.videosData?.name}</h3>
                <p>{props.videosData?.description}</p>
                <a href={props.videosData?.originalLink}>{props.videosData?.originalLink}</a>
                <p>Owner: {props.videosData?.owner?.name}</p>
                <span>created at: {props.videosData?.createdAt}</span>
                <p>updated at: {props.videosData?.updatedAt}</p>
            </div>
        </div>
    );
}