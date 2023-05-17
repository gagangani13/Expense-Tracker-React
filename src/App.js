import React from "react";
import LOGIN from "./Components/Login/LOGIN";
import { Switch,Route, Redirect } from "react-router-dom";
import WELCOME from "./Components/Welcome/WELCOME";
import UserProvider from "./Components/Context/UserProvider";
const App = () => {
  return (
    <UserProvider>
        <Switch>
          <Route path="/" exact>
            <LOGIN/>
          </Route>
          <Route path="/WELCOME" exact>
            <WELCOME/>
          </Route>
          <Route path='*'>
            <Redirect to='/'/>
          </Route>
        </Switch>
    </UserProvider>
  );
};

export default App;
