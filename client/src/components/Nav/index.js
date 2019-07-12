import React from "react";

import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-primary">

      <Link className="navbar-brand" to={"/"}>
        <h1>
          React Google Books
        </h1>
      </Link>
      <div>
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
      </div>

    </nav>
  );
}

export default Nav;
