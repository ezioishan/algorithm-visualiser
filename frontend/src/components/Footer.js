import React from "react";

import Navbar from "react-bootstrap/Navbar";


import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer_main">
        <Navbar bg="primary" variant="dark" fixed="bottom">
          <p><strong>By Ishan Sourav with <span style={{fontSize:'200%', color:'red'}}>&hearts;</span></strong></p>
        </Navbar>
      </footer>
    );
  }
}
export default Footer;
