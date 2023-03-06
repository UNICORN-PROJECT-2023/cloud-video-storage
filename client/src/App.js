import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Test from './screens/TestScreen';
import Profile from './screens/ProfileScreen';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="home" element={<Home/>} />
          <Route path="test" element={<Test/>} />
          <Route path="profile/" element={<Profile/>} />
          <Route path="profile/:id" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;