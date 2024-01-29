import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { addNewBus } from "../services/busService";
import { getBuses } from "../services/busService";

class Bus extends Form {
  state = {
    data: {
      vehicleNumber: "",
      School: "",
      SchoolAddress: "",
      seats: "",
      ThingName: "",
    },
    errors: {},
    busses: [],
  };

  schema = {
    vehicleNumber: Joi.string().required().min(6).max(7).label("Licence Plate"),
    School: Joi.string().required().label("School"),
    SchoolAddress: Joi.string().required().label("SchoolAddress"),
    seats: Joi.number().required().label("Seats"),
    ThingName: Joi.string().required().length(6).label("ThingName"),
  };

  async componentDidMount() {
    try {
      const { data } = await getBuses();
      this.setState({ busses: data.registeredVehicles });
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await addNewBus({
        vehicleNumber: data.vehicleNumber,
        School: data.School,
        SchoolAddress: data.SchoolAddress,
        seats: data.seats,
        ThingName: data.ThingName,
      });
      // Optionally, you can redirect the user or perform other actions after the bus is successfully added.
      console.log("Bus added successfully!");
    } catch (error) {
      console.error("Error adding bus:", error.message);
    }
  };

  render({ busses } = this.state) {
    return (
      <div className="row">
        <div className="col-4">
          <h1>Add a new bus</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("vehicleNumber", "Licence Plate")}
            {this.renderInput("School", "School")}
            {this.renderInput("SchoolAddress", "School Address")}
            {this.renderInput("seats", "Seats")}
            {this.renderInput("ThingName", "SureWay Serial Number")}
            <br />
            {this.renderButton("Save")}
          </form>{" "}
          <br />
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Assign Busses to new users</h5>
              <p className="card-text">
                You can assign Busses to new users here
              </p>
              <a href="/assignBusses" className="btn btn-primary">
                Assign Busses
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <h1>Busses</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Licence Plate</th>
                <th scope="col">School</th>
                <th scope="col">Seats</th>
                <th scope="col">Seats filled</th>
                <th scope="col">Driver</th>
                <th scope="col">Serial Number</th>
              </tr>
            </thead>
            <tbody>
              {busses.map((bus) => (
                <tr key={bus.licencePlate}>
                  <td>{bus.vehicleID}</td>
                  <td>{bus.School}</td>
                  <td>{bus.seats}</td>
                  <td>{bus.seatsFilled}</td>
                  <td>{bus.Driver}</td>
                  <td>{bus.ThingName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Bus;
