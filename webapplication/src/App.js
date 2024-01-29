import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Track from "./components/Track";
import Bus from "./components/Bus";
import RegisterUser from "./components/RegisterUser";
import UserRecord from "./components/UserRecord";
import DriverRecord from "./components/DriverRecord";
import ExtraService from "./components/ExtraService";
import Home from "./components/home";
import NotFound from "./components/notFound";
import RegisterForm from "./components/driverRegisterForm";
import AmbulanceRegisterForm from "./components/mbulanceRegisterForm";
import AssignBusses from "./components/assignBusses";
import LocationTracking from "./components/LocationTracking";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import AdminDetails from "./components/adminDetails";
import SeeSnaps from "./components/seeSnaps";
import VehicleSnap from "./components/vehicleSnap";
import SignUpForm from "./components/signup";
import verifyForm from "./components/verify";

class App extends Component {
  state = {
    user: { username: "Anonymous" },
  };

  componentDidMount() {
    if (auth.getCurrentUser()) {
      const user = auth.getCurrentUser().user;
      this.setState({ user });
    }
  }

  isAuthenticated = () => {
    if (this.state.user.username === "Anonymous") {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <Route
          path={[
            "/Track",
            "/Bus",
            "/RegisterUser",
            "/UserRecord",
            "/DriverRecord",
            "/ExtraService",
            "/driverRegisterForm",
            "/ambulanceRegisterForm",
            "/assignBusses",
            "/LocationTracking",
            "/home",
            "/adminDetails",
            "/seeSnaps",
            "/vehicleSnap",
          ]}
          render={() => <NavBar user={user} />}
        />
        <main className="container">
          <Switch>
            <Route path="/Track" component={Track} />
            <Route path="/Bus" component={Bus} />
            <Route path="/RegisterUser" component={RegisterUser} />
            <Route path="/UserRecord" component={UserRecord} />
            <Route path="/DriverRecord" component={DriverRecord} />
            <Route path="/ExtraService" component={ExtraService} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/driverRegisterForm" component={RegisterForm} />
            <Route
              path="/ambulanceRegisterForm"
              component={AmbulanceRegisterForm}
            />
            <Route path="/assignBusses" component={AssignBusses} />
            <Route path="/LocationTracking" component={LocationTracking} />
            <Route path="/home" component={Home} />
            <Route path="/loginForm" component={LoginForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/verify" component={verifyForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/adminDetails" component={AdminDetails} />
            <Route path="/seeSnaps" component={SeeSnaps} />
            <Route path="/vehicleSnap" component={VehicleSnap} />
            <Redirect from="/" exact to="/loginForm" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
