import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Register from './screens/RegisterScreen';
import Profile from './screens/ProfileScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from './screens/LoginScreen';

import './App.css';


const isLoggedIn = localStorage.getItem('token') ? true : false;


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/profile" /> : <Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;