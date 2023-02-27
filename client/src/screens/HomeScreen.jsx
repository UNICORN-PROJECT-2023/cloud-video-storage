import HomePage from '../pages/HomePage';

function HomeScreen() {
    function onButtonClick () {
        alert('button clicked');
    }
    return(
        <HomePage
        title="Home"
        onButtonClick={onButtonClick}
        link="/test"
        />
    );
}
export default HomeScreen;