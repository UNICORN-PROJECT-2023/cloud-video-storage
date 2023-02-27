import TestPage from '../pages/TestPage';

function TestScreen() {
    function onButtonClick () {
        alert('button clicked');
    }
    return(
        <TestPage
        title="Test"
        onButtonClick={onButtonClick}
        link="/home" 
        />
    );
}
export default TestScreen;