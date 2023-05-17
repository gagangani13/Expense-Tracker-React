import React from "react";
import LOGIN from "./Components/Login/LOGIN";
import { Switch,Route } from "react-router-dom";
import WELCOME from "./Components/Welcome/WELCOME";
import UserProvider from "./Components/Context/UserProvider";
const App = () => {
  return (
    <UserProvider>
      <main style={{ minHeight: "90vh" }}>
        <Switch>
          <Route path="/" exact>
            <LOGIN/>
          </Route>
          <Route path="/WELCOME" exact>
            <WELCOME/>
          </Route>
        </Switch>
      </main>
    </UserProvider>
  );
};

export default App;
