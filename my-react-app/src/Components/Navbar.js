import React from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">Test Suite</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ml-auto">
    <li class="mx-4 text-white">
      <Link to='/'>Home</Link>
    </li>
    <li class="nav-item mx-4">
      <Link to='/Server_testing'>Server Testing</Link>
    </li>
    <li class="nav-item mx-4">
      <Link to='/Signup'>Signup</Link>
    </li>
  </ul>
</div>
      </div>
    </nav>
  );
}

export default Navbar;
