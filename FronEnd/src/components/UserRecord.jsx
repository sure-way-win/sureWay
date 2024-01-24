import React, { Component } from "react";
import { getUsers } from "../services/userRecordsService";
import userbanner from "../images/userbanner.jpg";
import SearchBox from "./common/searchBox";

class UserRecord extends Component {
  state = {
    users: [],
    selectedUser: "",
    children: [],
    searchQuery: "",
  };

  async componentDidMount() {
    try {
      const { data } = await getUsers();
      this.setState({ users: data.users });
      this.setState({ selectedUser: data.users[0] });
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  handleUserSelect = (user) => {
    this.setState({ selectedUser: user });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  filterUsers = () => {
    const { users, searchQuery } = this.state;
    if (!searchQuery) return users;

    const filteredUsers = users.filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const remainingUsers = users.filter(
      (user) => !filteredUsers.includes(user)
    );

    return [...filteredUsers, ...remainingUsers];
  };

  render() {
    const { selectedUser, searchQuery } = this.state;
    const filteredUsers = this.filterUsers();

    return (
      <div className="row">
        <div className="col-3">
          <ul className="list-group" style={{ marginTop: 16 }}>
            {filteredUsers.map((user) => (
              <li
                key={user._id}
                className={
                  user === selectedUser
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => this.handleUserSelect(user)}
              >
                {user.fullName}
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          {selectedUser ? (
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={userbanner}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {selectedUser?.fullName || "No users"}
                    </h5>
                    <p className="card-text">
                      Username: {selectedUser?.username || ""} <br />
                      Contact Number: {selectedUser?.contactNumber || ""} <br />
                      Email: {selectedUser?.email || ""} <br />
                      Children:{" "}
                      {selectedUser?.children &&
                        selectedUser.children.length > 0 &&
                        selectedUser.children.map((child, index) => (
                          <React.Fragment key={child._id}>
                            {selectedUser.children[index]}
                            {index < selectedUser.children.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No users available</p>
          )}
          <div>
            {selectedUser?.children &&
            selectedUser.children.length > 0 &&
            selectedUser?.childrenData &&
            selectedUser.childrenData.length > 0
              ? selectedUser.childrenData.map((child) => (
                  <div
                    className="card mb-3"
                    style={{ maxWidth: "540px" }}
                    key={child._id}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={userbanner}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{child.name}</h5>
                          <p className="card-text">
                            Name: {child.name} <br />
                            Age: {child.age} <br />
                            School: {child.school} <br />
                            Address: {child.pickupAddress} <br />
                            VehicleID: {child.vehicleId} <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default UserRecord;
