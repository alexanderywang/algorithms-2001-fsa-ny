import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Header from "./Header";
import { AuthProvider } from "./Auth";

import { firebase } from "../config/firebase.js";

const App = () => {
  const [user, setUser] = useState({ loggedIn: true });
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);
  return (
    <AuthProvider value={user}>
      <BrowserRouter>
        <Header user={user} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={() => <Home user={user} />} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
