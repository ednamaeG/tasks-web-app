import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../providers/AuthProvider';
import '../styles/Header.css'
export default function Header() {

    const auth = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.logout();
        navigate('/sign-in');
    }
    return (
        <Navbar expand="lg" className='header-menu-teal'>
            <Container>
               <Link to={"/"}> <Navbar.Brand><img src='https://c2zyebdn.cloudimg.io/s/cdn/x/https://divin2sy6ce0b.cloudfront.net/images/2017-11-06/whiteLogo2-min.png' className='logo'></img></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        auth.user ? <Nav className="justify-content-end flex-grow-1 pe-5">
                            <NavDropdown title="Menu" id="basic-nav-dropdown" className='menu-button'>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> : null
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );

}
