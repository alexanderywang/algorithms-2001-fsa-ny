import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Header from "./Header";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = ({ currentUser }) => {
  console.log("App -> currentUser", currentUser);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <PrivateRoute exact path="/" component={Home} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
