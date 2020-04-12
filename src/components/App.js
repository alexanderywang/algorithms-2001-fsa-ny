import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "@emotion/styled";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Header from "./Header";
import PairGenerator from "./PairGenerator";
import { useTheme } from "./ThemeContext";
import { AuthProvider } from "./Auth";
import { firebase } from "../config/firebase.js";

const Wrapper = styled("div")`
  background: ${props => props.theme.background};
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen";
  h1 {
    color: ${props => props.theme.body};
  }
`;

const App = () => {
  const [user, setUser] = useState({ loggedIn: true });
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);
  const themeState = useTheme();
  return (
    <Wrapper>
      <h1>Dark Mode example</h1>
      <div>
        <button onClick={() => themeState.toggle()}>
          {themeState.dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <AuthProvider value={user}>
        <BrowserRouter>
          <Header user={user} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/pairgenerator" component={PairGenerator} />
            <Route exact path="/" component={() => <Home user={user} />} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </Wrapper>
  );
};

export default App;
