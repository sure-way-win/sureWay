import React, { Component } from "react";
import { getDriverSnaps } from "../services/snapService";

class SeeSnaps extends Component {
  //   state = {
  //     snaps: [],
  //   };

  //   async componentDidMount() {
  //     const { selectedDriver } = this.props.location.state;
  //     console.log(selectedDriver);
  //     try {
  //       const { data } = await getDriverSnaps(selectedDriver);
  //       this.setState({ snaps: data.driverSnaps });
  //     } catch (error) {
  //       console.error("Error fetching snaps:", error.message);
  //     }
  //   }
  render() {
    const { selectedDriver } = this.props.location.state;
    console.log(selectedDriver);
    return selectedDriver?.Snap.map((snap) => (
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
