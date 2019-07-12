import React from "react";

import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <Link className="navbar-brand" to={"/"}>
        <strong>
          React Google Books
        </strong>
      </Link>
      <Link className="navbar-brand" to={"/"}>
        <strong>
          Book search
        </strong>
      </Link>
      <Link className="navbar-brand" to={"/saved"}>
        <strong>
          Saved Books
        </strong>
      </Link>
    </nav>
  );
}

export default Nav;
