import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { verify } from "../services/signUpService";
import { Link, withRouter } from "react-router-dom";

class verifyForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      verificationCode: "",
    },
    errors: {},
    successMessage: "",
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    verificationCode: Joi.string().required().label("Verification Code"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await verify({
        username: data.username,
        password: data.password,
        verificationCode: data.verificationCode,
      });
      // Optionally, you can redirect the user or perform other actions after the bus is successfully added.
      console.log("User verified successfully!");
      this.props.history.push("/loginForm");
    } catch (error) {
      console.error("Error verifying user:", error.message);
    }
  };

  render() {
    return (
      <>
        <h1>Verify</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("verificationCode", "Verification Code")}
          {this.renderButton("Verify")}
          <Link to="/loginForm">Login</Link>
        </form>
      </>
    );
  }
}

export default withRouter(verifyForm);
