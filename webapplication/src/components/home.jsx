import React, { Component } from "react";
import banner from "../images/banner.jpg";
import AccidentAlers from "./accidentAlerts";

class Home extends Component {
  state = {};

  render() {
    return (
      <>
        <div className="card text-bg-dark">
          <img src={banner} className="card-img" alt="..." />
          <div className="card-img-overlay">
            {/* <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small>Last updated 3 mins ago</small>
            </p> */}
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tracking Vehicles</h5>
              <p className="card-text">You can track all your busses here</p>
              <a href="/Track" className="btn btn-primary">
                Tracking
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Vehicles</h5>
              <p className="card-text">You can manage busses here</p>
              <a href="/Bus" className="btn btn-primary">
                Busses
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Driver Registration</h5>
              <p className="card-text">You can register drivers here</p>
              <a href="/RegisterUser" className="btn btn-primary">
                Register
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Records</h5>
              <p className="card-text">
                You can see records of all your students' here
              </p>
              <a href="/UserRecord" className="btn btn-primary">
                User Records
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Driver records</h5>
              <p className="card-text">
                You can see records of all your drivers' here
              </p>
              <a href="/DriverRecord" className="btn btn-primary">
                Driver Records
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Services</h5>
              <p className="card-text">You can alert ambulances from here</p>
              <a href="/ExtraService" className="btn btn-primary">
                Services
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Alerts</h5>
              {/* <p className="card-text">You can alert ambulances from here</p> */}
              <AccidentAlers />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
