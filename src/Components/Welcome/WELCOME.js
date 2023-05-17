import React, { useContext } from "react";
import { Navbar, Container, NavLink } from "react-bootstrap";
import UserContext from "../Context/UserContext";
import ProfileDisplay from "./ProfileDisplay";
const WELCOME = () => {
  const ctx=useContext(UserContext)
  function setProfileHandler() {
    if(ctx.updateProfile.profileButton){
      ctx.updateProfile.profileButtonFunction(false)
    }else{
      ctx.updateProfile.profileButtonFunction(true)
    }
  }
  return (
    <>
      <Navbar
        bg="dark"
        expand="sm"
        variant="dark"
        className="position-fixed w-100 text-l"
        style={{ zIndex: "5", color: "white" }}
      >
        <Container>
          <h1>Welcome To Expense Tracker</h1>
          <p
            className="d-grid"
            style={{ gridTemplateColumns: "auto auto", gridColumnGap: "5px" }}
          >
            Your profile is incomplete{" "}
            <NavLink style={{ color: "blue" }} onClick={setProfileHandler}>
              Complete now
            </NavLink>
          </p>
        </Container>
      </Navbar>
      {ctx.updateProfile.profileButton && <ProfileDisplay />}
    </>
  );
};

export default WELCOME;
