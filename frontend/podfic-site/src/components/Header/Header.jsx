import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./header.css";

class Header extends Component {
  render() {
    return (
      <header className="header-main">
        <div className="main-link">
          <Link to="/">Podfic Site</Link>
        </div>
        <nav>
          <Link to="/submit">Submit a Podfic</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
