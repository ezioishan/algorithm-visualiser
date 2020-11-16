import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class NavBar extends React.Component {
	render() {
		return (
			<Navbar bg="primary" variant="dark">
				<Navbar.Brand href="#home">
					<strong>Algo-Visual</strong>
				</Navbar.Brand>
				<Nav className="mr-0">
					{
						this.props.isLoggedIn === true 
						? <Nav.Link href="/" style={{marginLeft: '70vw'}}>Logout</Nav.Link>
						:<Nav.Link href="/" style={{marginLeft: '70vw'}} >Login</Nav.Link>
					}
						<Nav.Link href="/register">Register</Nav.Link>
						
				</Nav>
			</Navbar>
		);
	}
}

export default NavBar;
