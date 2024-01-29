import React, { Component } from "react";
import {
  getUnasignedChildren,
  rejectRequest,
  getMatchingBusses,
  assignBus,
} from "../services/busService";
import Select from "./common/select";

class AssignBusses extends Component {
  state = {
    children: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getUnasignedChildren();
      this.setState({ children: data.childDetails });
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  handleRejectRequest = async (child) => {
    try {
      await rejectRequest(child);
      // Update state to remove the deleted child
      this.setState((prevState) => ({
        children: prevState.children.filter((c) => c !== child),
      }));
    } catch (error) {
      console.error("Error rejecting request:", error.message);
    }
  };

  render({ children } = this.state) {
    return (
      <>
        <h1>Assign busses for the new users</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">School</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {children &&
              children.map((child) => (
                <tr key={child.parent_username}>
                  <td>{child.name}</td>
                  <td>{child.school}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.handleRejectRequest(child)}
                    >
                      Reject
                    </button>
                  </td>

                  <td>
                    <ChildBusSelect child={child} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
}

class ChildBusSelect extends Component {
  state = {
    busses: [],
    selectedBus: "",
  };

  async componentDidMount() {
    const { child } = this.props;
    //console.log(child.school);
    const busses = await this.fetchMatchingBusses({ School: child.school });
    this.setState({ busses });
    //console.log(busses);
  }

  handleBusChange = (event) => {
    const { child } = this.props;
    this.setState({ selectedBus: event.target.value }); // Update selected value
    assignBus({
      vehicleID: event.target.value,
      parent_username: child.parent_username,
      name: child.name,
    });
  };

  fetchMatchingBusses = async (school) => {
    try {
      const { data } = await getMatchingBusses(school);
      return data.gettingMatchingAvailableBus;
    } catch (error) {
      console.error("Error fetching matching busses:", error.message);
      return [];
    }
  };

  render() {
    const { busses } = this.state;

    return (
      <Select
        options={busses}
        label="Choose a vehicle"
        //value={selectedBus?}
        onChange={this.handleBusChange}
        value={this.state.selectedBus}
      />
    );
  }
}

export default AssignBusses;
