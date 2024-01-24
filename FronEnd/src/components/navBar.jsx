import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          SureWay
        </Link>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/Track">
                Tracking
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/Bus">
                Busses
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/RegisterUser">
                Register
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/UserRecord">
                User Records
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/DriverRecord">
                Driver Records
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/ExtraService">
                Services
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
