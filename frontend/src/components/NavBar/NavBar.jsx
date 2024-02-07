import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({onMessagesClick}) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/posts">Acebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/posts">Home</Nav.Link>
                    <Nav.Link href="/myprofile">Profile</Nav.Link>
                    <Nav.Link href="#" onClick={onMessagesClick}>Messages</Nav.Link>
                    <Nav.Link href="/"
                    onClick = {()=> {console.log(
                        'logging out');
                        localStorage.clear();
                        }}>Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar





