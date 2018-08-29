import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./header.css";

class Header extends Component {
  render() {
    return (
      <header className="header-main">
        <Link to="/">Podfic Site</Link>
      </header>
    );
  }
}

export default Header;
