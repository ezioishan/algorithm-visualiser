import React from "react";
import NavBar from "./NavBar";

class Header extends React.Component {
  render() {
    return (
      <div>
        <NavBar isLoggedIn={this.props.isLoggedIn}/>
      </div>
    );
  }
}

export default Header;
