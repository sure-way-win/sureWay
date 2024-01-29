// import React from "react";
// import Joi from "joi-browser";
// import Form from "./common/form";

// class AmbulanceRegisterForm extends Form {
//   state = {
//     data: {
//       Name: "",
//       username: "",
//       password: "",
//       contactNumber: "",
//       email: "",
//       address: "",
//     },
//     errors: {},
//     successMessage: "",
//   };

//   schema = {
//     Name: Joi.string().required().label("Ambulance Service Name"),
//     username: Joi.string().required().label("Username"),
//     password: Joi.string().required().label("Password"),
//     contactNumber: Joi.string().required().label("Contact Number"),
//     email: Joi.string().required().label("Email"),
//     address: Joi.string().required().label("Address"),
//   };

//   doSubmit = async () => {
//     try {
//       const { data } = this.state;
//       await registerNewAmbulance({
//         Name: data.Name,
//         username: data.username,
//         password: data.password,
//         contactNumber: data.contactNumber,
//         email: data.email,
//         address: data.address,
//       });
//       // Optionally, you can redirect the user or perform other actions after the bus is successfully added.
//       console.log("Ambulance added successfully!");
//     } catch (error) {
//       console.error("Error adding ambulance:", error.message);
//     }
//   };

//   render() {
//     return (
//       <>
//         <h1>Ambulance Registration</h1>
//         <form onSubmit={this.handleSubmit}>
//           {this.renderInput("Name", "Ambulance Service Name")}
//           {this.renderInput("username", "Username")}
//           {this.renderInput("password", "Password", "password")}
//           {this.renderInput("contactNumber", "Contact Number")}
//           {this.renderInput("email", "Email")}
//           {this.renderInput("address", "Address")}
//           {this.renderButton("Register")}
//         </form>
//       </>
//     );
//   }
// }
