import React, { useEffect, useState, } from "react";
import { Navbar, Container, NavLink, Button } from "react-bootstrap";
import { Route,Redirect } from "react-router-dom";
import ProfileDisplay from "./ProfileDisplay";
import ExpenseForm from "./ExpenseForm";
import { useSelector,useDispatch } from "react-redux";
import { authAction } from "../Store/authSlice";
import { expenseAction } from "../Store/expenseSlice";
const WELCOME = () => {
  
  useEffect(()=>{
    const idToken=localStorage.getItem('idToken')
    const userId=localStorage.getItem('userId')
    if(idToken&&userId){
      dispatch(authAction.loginHandler())
      dispatch(authAction.setToken(idToken))
      dispatch(authAction.setUserId(userId))
      fromFirebase()
    }
    // eslint-disable-next-line 
  },[])
  async function fromFirebase() {
    const userId=localStorage.getItem('userId')
    const response = await fetch(
      `https://signup-and-authenticatio-f712f-default-rtdb.firebaseio.com/Users/${userId}.json`
    );
    const data = await response.json();
    try {
      if (response.ok) {
        let arr = [];
        for (const item in data) {
          arr.unshift({
            amount: data[item].amount,
            description: data[item].description,
            category: data[item].category,
            expenseId: item,
          });
        }
        dispatch(expenseAction.reloadExpense(arr))
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(data.error.message);
    }
  }
  const login=useSelector((state)=>state.authenticate.login)
  const premium=useSelector((state)=>state.expenseList.premium)
  const dispatch=useDispatch()
  const [verify,setVerify]=useState(false)
  const[profile,setProfile]=useState(false)

  function setProfileHandler() {
    setProfile(!profile)
  }
  function logoutHandler(){
    dispatch(authAction.logoutHandler())
    localStorage.removeItem('idToken')
    localStorage.removeItem('userId')
  }
  async function verifyHandler(e){
    if(!verify){
      e.preventDefault()
        const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBXPzqlI6fvUIQX7LiIqUK-vdC_dfWQ0q8`,{
            method:'POST',
            body:JSON.stringify({requestType:'VERIFY_EMAIL',idToken:localStorage.getItem('idToken')})
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
      {login&&<>
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
          {premium&&<Button variant='success' type='button'>Activate Premium</Button>}
          <Button variant='danger' onClick={logoutHandler}>LOGOUT</Button>
        </Container>
      </Navbar>
      <ExpenseForm/>
      </>}
      {profile&& <ProfileDisplay profile={setProfileHandler} />}
      {!login&&<Route><Redirect to='/'/></Route>}
      {/* {localStorage.getItem('Token')==null&&<Route><Redirect to='/'/></Route>} */}
</>
  );
};

export default WELCOME;
