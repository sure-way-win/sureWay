import React from "react";

const RegisterUsers = () => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Driver Registration</h5>
          <p className="card-text">You can register drivers here</p>
          <a href="/driverRegisterForm" className="btn btn-primary">
            Register
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Ambulance Service registration</h5>
          <p className="card-text">You can register mbulance ervices here</p>
          <a href="/ambulanceRegisterForm" className="btn btn-primary">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterUsers;
