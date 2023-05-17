import React from "react";
import LOGIN from "./Components/Login/LOGIN";
import { Switch,Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import WELCOME from "./Components/Welcome/WELCOME";
import UserProvider from "./Components/Context/UserProvider";
const App = () => {
  return (
    <UserProvider>
      <Header />
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
      <Footer />
    </UserProvider>
  );
};

export default App;
