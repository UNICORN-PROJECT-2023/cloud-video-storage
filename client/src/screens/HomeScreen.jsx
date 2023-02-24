import { Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';

function Home() {
    function onButtonClick () {
        alert('button clicked');
    }
    return(
        <HomePage
        title="Home"
        onButtonClick={onButtonClick}
        />
    );
}
export default Home;