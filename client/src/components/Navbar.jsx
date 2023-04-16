import logo from '../images/UniTubeLogo.png';
import { useEffect, useState } from 'react';
import UserService from '../services/userService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion} from 'framer-motion';

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
        window.location.reload();
    }

    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    }

    const linkStyle = {
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
    }

    const subPages = [
        { name: 'Home', path: '/' },
        ...(data.username
            ? [{ name: data.username, path: '/profile', loggedIn: true }]
            : [
                { name: 'Login', path: '/login', loggedIn: false },
                { name: 'Register', path: '/register', loggedIn: false },
            ]
        ),
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: 'inherit'}}>
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
                    <ul className="navbar-nav" style={{ gap: '2rem', margin: '0.4rem 2rem' }}>
                        {subPages.map((page) => (
                            (!page.loggedIn || data.username) && (
                                <motion.li
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="nav-item"
                                    key={page.name}
                                >
                                    <Link className="nav-link" style={linkStyle} onClick={handleSidebarToggle} to={page.path}>{page.name}</Link>
                                </motion.li>
                            )
                        ))}
                        {data.username && (
                            <motion.li whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }} className="nav-item">
                                <Link className="nav-link" onClick={() => logout()} style={linkStyle} to="/">Logout</Link>
                            </motion.li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
