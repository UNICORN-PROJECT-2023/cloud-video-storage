import styled from 'styled-components';
import { useState } from 'react';
import {motion} from 'framer-motion';

const StyledVideoList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    padding: 1rem 2rem;
    margin: 0 auto;
    @media only screen and (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }

    .gridItem {
        border-radius: 1rem;
        color: black;
        padding: 1rem;
        background-color: white;
        box-shadow: 0 25px 80px 0 rgb(22 24 28 / 10%);
    }
    .gridItem:hover {
        box-shadow: 0 25px 80px 0 rgb(22 24 28 / 20%);
        cursor: pointer;
    }
`;

function VideoList() {
    const [videos, setVideos] = useState([
        { title: "Video 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt officiis ipsam accusantium velit soluta, a ut corporis explicabo nisi labore eos culpa quas eveniet! Animi repellendus ipsam quos odit?", url: "https://www.youtube.com/watch?v=1" },
        { title: "Video 2", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt officiis ipsam accusantium velit soluta, a ut corporis explicabo nisi labore eos culpa quas eveniet! Animi repellendus ipsam quos odit?", url: "https://www.youtube.com/watch?v=2" },
        { title: "Video 3", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt officiis ipsam accusantium velit soluta, a ut corporis explicabo nisi labore eos culpa quas eveniet! Animi repellendus ipsam quos odit?", url: "https://www.youtube.com/watch?v=3" },
        { title: "Video 4", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt officiis ipsam accusantium velit soluta, a ut corporis explicabo nisi labore eos culpa quas eveniet! Animi repellendus ipsam quos odit?", url: "https://www.youtube.com/watch?v=4" },
        { title: "Video 5", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt officiis ipsam accusantium velit soluta, a ut corporis explicabo nisi labore eos culpa quas eveniet! Animi repellendus ipsam quos odit?", url: "https://www.youtube.com/watch?v=5" },
        { title: "Video 6", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt officiis ipsam accusantium velit soluta, a ut corporis explicabo nisi labore eos culpa quas eveniet! Animi repellendus ipsam quos odit?", url: "https://www.youtube.com/watch?v=6" },
        { title: "Video 7", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt officiis ipsam accusantium velit soluta, a ut corporis explicabo nisi labore eos culpa quas eveniet! Animi repellendus ipsam quos odit?", url: "https://www.youtube.com/watch?v=7" },
        { title: "Video 8", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt officiis ipsam accusantium velit soluta, a ut corporis explicabo nisi labore eos culpa quas eveniet! Animi repellendus ipsam quos odit?", url: "https://www.youtube.com/watch?v=8" },
    ]);

    // const [videos, setVideos] = useState([{ api bullshit }]);

    return (
        <StyledVideoList>
            {videos.map((video) => (
                <motion.div 
                    whileHover={{scale: 1.1}} 
                    whileTap={{scale: 0.9}}
                    className='gridItem' 
                    key={video.title}
                >
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <a href={video.url}>{video.url}</a>
                </motion.div>
            ))}
        </StyledVideoList>
    );
}
export default VideoList;