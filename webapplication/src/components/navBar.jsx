import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import S from "../images/S.png";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img src={S} alt="SureWay Logo" height="30" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Track">
                Tracking
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Bus">
                Busses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/RegisterUser">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/UserRecord">
                User Records
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/DriverRecord">
                Driver Records
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ExtraService">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminDetails">
                {user.username}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
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
