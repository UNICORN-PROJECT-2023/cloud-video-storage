import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Register from './screens/RegisterScreen';
import Profile from './screens/ProfileScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from './screens/LoginScreen';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile/" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;