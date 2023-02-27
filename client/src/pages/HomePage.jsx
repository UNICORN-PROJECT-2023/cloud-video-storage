import { Link } from 'react-router-dom';

function HomePage(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>Home page</p>
            <Link to={props.link}>
                <button>Route</button>
            </Link>
            <button onClick={props.onButtonClick}>click me</button>
        </div>
    );
}
export default HomePage;