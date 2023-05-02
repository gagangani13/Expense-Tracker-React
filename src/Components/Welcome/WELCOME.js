import React, { useState,useContext } from "react";
import { Navbar, Container, NavLink, Button } from "react-bootstrap";
import UserContext from "../Context/UserContext";
import ProfileDisplay from "./ProfileDisplay";
const WELCOME = () => {
  const [verify,setVerify]=useState(false)
  const ctx=useContext(UserContext)
  function setProfileHandler() {
    if(ctx.updateProfile.profileButton){
      ctx.updateProfile.profileButtonFunction(false)
    }else{
      ctx.updateProfile.profileButtonFunction(true)
    }
  }
  async function verifyHandler(e){
    if(!verify){
      e.preventDefault()
        const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBXPzqlI6fvUIQX7LiIqUK-vdC_dfWQ0q8`,{
            method:'POST',
            body:JSON.stringify({requestType:'VERIFY_EMAIL',idToken:localStorage.getItem('Token')})
        })
        const data=await response.json()
        try {
            if(response.ok){
                setVerify(true)
            }else{
                throw new Error()
            }
            
        } catch (error) {
            alert(data.error.message)
        }
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
          <Button variant={verify?'success':'warning'} type='submit'onClick={verifyHandler}>{verify?'Verified':'Verify User'}</Button>
        </Container>
      </Navbar>
      {ctx.updateProfile.profileButton && <ProfileDisplay />}
    </>
  );
};

export default WELCOME;
