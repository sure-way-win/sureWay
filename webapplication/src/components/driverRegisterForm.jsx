import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { registerNewDriver } from "../services/registerService";
import { getVehicles } from "../services/registerService";

class RegisterForm extends Form {
  state = {
    data: {
      firstName: "",
      lastDName: "",
      userDname: "",
      password: "",
      contactDNumber: "",
      emailD: "",
      addressD: "",
      nicD: "",
      licensenumberD: "",
      assignedVehicle: "",
    },
    errors: {},
    successMessage: "", // New state variable for success message
    vehicles: [],
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastDName: Joi.string().required().label("Last Name"),
    userDname: Joi.string().required().label("Username"),
    password: Joi.string().required().min(6).label("Password"),
    contactDNumber: Joi.string().required().label("Contact Number"),
    emailD: Joi.string().required().label("Email"),
    addressD: Joi.string().required().label("Address"),
    nicD: Joi.string().required().min(10).max(12).label("NIC"),
    licensenumberD: Joi.string().required().label("License Number"),
    assignedVehicle: Joi.string().required().label("AssignedVehicle"),
  };

  async componentDidMount() {
    const { data } = await getVehicles();
    this.setState({ vehicles: data.registeredVehiclesWithoutDriver });
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await registerNewDriver({
        firstName: data.firstName,
        lastDName: data.lastDName,
        userDname: data.userDname,
        password: data.password,
        contactDNumber: data.contactDNumber,
        emailD: data.emailD,
        addressD: data.addressD,
        nicD: data.nicD,
        licensenumberD: data.licensenumberD,
        assignedVehicle: data.assignedVehicle,
      });
      // Optionally, you can redirect the user or perform other actions after the bus is successfully added.
      console.log("Driver added successfully!");
    } catch (error) {
      console.error("Error adding driver:", error.message);
    }
  };

  render() {
    return (
      <div>
        <h1>Register a new driver</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastDName", "Last Name")}
          {this.renderInput("userDname", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("contactDNumber", "Contact Number")}
          {this.renderInput("emailD", "Email")}
          {this.renderInput("addressD", "Address")}
          {this.renderInput("nicD", "NIC")}
          {this.renderInput("licensenumberD", "License Number")} <br />
          {/* {this.renderInput("licensenumberD", "License Number")} <br /> */}
          {this.renderSelect(
            "assignedVehicle",
            "Assigned Vehicle",
            this.state.vehicles
          )}{" "}
          <br />
          {this.renderButton("Register")} <br />
          {/* {this.renderSelect("genreId", "Genre", this.state.bu)} */}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
