import React, { Component } from "react";
import { getUnasignedChildren } from "../services/busService";

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

  render({ children } = this.state) {
    return (
      <>
        <h1>Assign busses for the new users</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">School</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {children &&
              children.map((child) => (
                <tr key={child}>
                  <td>{child.name}</td>
                  <td>{child.school}</td>
                  <td>
                    <h1>OK</h1>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default AssignBusses;
