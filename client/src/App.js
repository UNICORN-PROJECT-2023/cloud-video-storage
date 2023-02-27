import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Test from './screens/TestScreen';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="home" element={<Home/>} />
          <Route path="test" element={<Test/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;