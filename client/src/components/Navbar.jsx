import logo from '../images/UniTubeLogo.png';
import { useEffect, useState } from 'react';
import UserService from '../services/userService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const userService = new UserService();
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        email: "",
    });

    async function getUser() {
        const user = await userService.getCurrentUser();
        setData({
            username: user.body.username,
            email: user.body.email,
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    function logout() {
        localStorage.removeItem('token');
        setData({
            username: "",
            email: "",
        });
        navigate('/');
    }

    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    }

    const linkStyle = {
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <Link className="navbar-brand" to="/" >
                <img src={logo} width="150" height="150" alt="" />
            </Link>
            <button className="navbar-toggler" type="button" style={{ margin: '0.4rem 2rem' }} onClick={handleSidebarToggle} aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div style={{ backgroundColor: '#3c6ca8' }} className={`offcanvas offcanvas-end${showSidebar ? ' show' : ''}`} tabIndex="-1" id="sidebar">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close text-reset" onClick={handleSidebarToggle}></button>
                </div>
                <div className="offcanvas-body d-flex justify-content-end">
                    <ul className="navbar-nav" style={{gap: '2rem', margin: '0.4rem 2rem'}}>
                        <li className="nav-item active">
                            <Link className="nav-link" style={linkStyle} onClick={handleSidebarToggle} to="/">Home</Link>
                        </li>
                        {!data.username ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" style={linkStyle} onClick={handleSidebarToggle} to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" style={linkStyle} onClick={handleSidebarToggle} to="/register">Register</Link>
                                </li>
                            </>
                            : <li className="nav-item">
                                <Link className="nav-link" onClick={() => logout()} style={linkStyle} to="/">Logout</Link>
                            </li>}
                        <li className="nav-item">
                            <Link className="nav-link" style={linkStyle} to="/profile">{data.username}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;