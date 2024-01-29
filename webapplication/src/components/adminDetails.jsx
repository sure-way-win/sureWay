import React, { Component } from "react";
import userbanner from "../images/userbanner.jpg";
import auth from "../services/authService";

class AdminDetails extends Component {
  state = {
    user: { username: "Anonymous" },
  };

  componentDidMount() {
    if (auth.getCurrentUser()) {
      const user = auth.getCurrentUser().user;
      this.setState({ user });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="card">
        {/* <img src={userbanner} className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title"> {user.name}</h5>
          <p className="card-text"></p>
          Email: {user.email} <br />
          Contact Number: {user.contactNumber}
        </div>
      </div>
    );
  }
}

export default AdminDetails;
