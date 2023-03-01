import { Link } from 'react-router-dom';

function TestPage(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>Home page</p>
            <Link to={props.link}>
                <button>Route</button>
            </Link>
            <button onClick={props.onButtonClick}>{props.buttonText}</button>
            <div className="data">
                {props.data}
            </div>
        </div>
    );
}
export default TestPage;