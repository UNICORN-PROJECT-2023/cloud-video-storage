import { Link } from 'react-router-dom';

function Home(props) {
    return(
        <div>
            <h1>{props.title}</h1>
            <p>Home page</p>
            <button onClick={props.onButtonClick}>click me</button>
        </div>
    );
}
export default Home;