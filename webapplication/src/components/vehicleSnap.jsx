import React, { Component } from "react";
import { getVehicleSnap } from "../services/snapService";

class VehicleSnap extends Component {
  state = {
    snap: "",
  };

  async componentDidMount() {
    const { bus } = this.props.location.state || {};
    console.log(bus.vehicleID);
    const { data } = await getVehicleSnap({ vehicleID: bus?.vehicleID });
    this.setState({ snap: data?.vehicleSnap[0]?.Snap });
    console.log(this.state.snap);
  }

  render() {
    return <img src={this.state.snap} alt="snap" />;
  }
}

export default VehicleSnap;
