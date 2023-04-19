import styled from 'styled-components';

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

export default function VideoGrid({children}) {
    return(
        <StyledVideoList>
            {children}
        </StyledVideoList>
    );
}