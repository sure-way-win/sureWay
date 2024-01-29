import React, { Component } from "react";
import { getDriverSnaps } from "../services/snapService";

class SeeSnaps extends Component {
  state = {
    snaps: [],
  };

  async componentDidMount() {
    const { selectedDriver } = this.props.location.state;
    //console.log(selectedDriver);
    try {
      const { data } = await getDriverSnaps({
        username: selectedDriver.username,
      });
      console.log(data.driverSnaps);
      this.setState({ snaps: data.driverSnaps[0]?.Snap });
      console.log(this.state.snaps);
    } catch (error) {
      console.error("Error fetching snaps:", error.message);
    }
  }
  render() {
    //const { selectedDriver } = this.props.location.state;
    //console.log(selectedDriver);
    return this.state.snaps?.map((snap) => (
      <div className="card" key={snap}>
        <div className="card-body">
          <h5 className="card-title">photo</h5>
          <img src={snap} alt="snap" />
        </div>
      </div>
    ));
  }
}

export default SeeSnaps;
