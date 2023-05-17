import React, { useEffect, useState } from "react";
import { Navbar, Container, NavLink, Button, } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import ProfileDisplay from "./ProfileDisplay";
import ExpenseForm from "./ExpenseForm";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../Store/authSlice";
import { expenseAction } from "../Store/expenseSlice";
import "./toggleSwitch.css";
import { themeAction } from "../Store/themeSlice";
const WELCOME = () => {
  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    const userId = localStorage.getItem("userId");
    if (idToken && userId) {
      dispatch(authAction.loginHandler());
      dispatch(authAction.setToken(idToken));
      dispatch(authAction.setUserId(userId));
      fromFirebase();
    }
    // eslint-disable-next-line
  }, []);
  async function fromFirebase() {
    const userId = localStorage.getItem("userId");
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
        dispatch(expenseAction.reloadExpense(arr));
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(data.error.message);
    }
  }
  const login = useSelector((state) => state.authenticate.login);
  const premium = useSelector((state) => state.expenseList.premium);
  const light= useSelector((state) => state.theme.light);
  const activatePremium= useSelector((state) => state.expenseList.activatePremium);
  const expenses= useSelector((state) => state.expenseList.expenses);
  const dispatch = useDispatch();
  const [verify, setVerify] = useState(false);
  const [profile, setProfile] = useState(false);
  let Url;
  function setProfileHandler() {
    setProfile(!profile);
  }
  function logoutHandler() {
    dispatch(authAction.logoutHandler());
    localStorage.removeItem("idToken");
    localStorage.removeItem("userId");
  }
  function setTheme(){
      dispatch(themeAction.setLight())
  }
  function activation() {
    dispatch(expenseAction.setActivatePremium())
    if(activatePremium && !light){
      dispatch(themeAction.setLight())
    }
  }
  function downloadExpenses() {
    const makeCsv=expenses.map((item)=>{
      return [item.amount,item.description,item.category].join('-')
    })
    makeCsv.unshift(['Amount','Description','Category'].join('-'))
    console.log(makeCsv)
    const blob1=new Blob([makeCsv])
    Url=URL.createObjectURL(blob1)
  }
  activatePremium&&downloadExpenses()
  async function verifyHandler(e) {
    if (!verify) {
      e.preventDefault();
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBXPzqlI6fvUIQX7LiIqUK-vdC_dfWQ0q8`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: localStorage.getItem("idToken"),
          }),
        }
      );
      const data = await response.json();
      try {
        if (response.ok) {
          setVerify(true);
        } else {
          throw new Error();
        }
      } catch (error) {
        alert(data.error.message);
      }
    }
  }

  return (
    <>
    <div style={{   backgroundColor: light?'#dbe4e7':'currentcolor',
      height: '100vh',
      position: 'fixed',
      width: '100vw',}}>
    </div>
    <>
      {login && (
        <>
          <Navbar
            expand="sm"
            variant="dark"
            className="position-fixed w-100 text-l"
            style={{ zIndex: "5", border: "solid" ,color:light?'black':'white',backgroundColor:light?'#bdcfc7':'black'}}
          >
            <Container>
              <h1>Welcome To Expense Tracker</h1>

              <NavLink style={{ color: light?"blue":'white' }} onClick={setProfileHandler}>
                View Profile
              </NavLink>
              <Button
                variant={verify ? "success" : "warning"}
                type="submit"
                onClick={verifyHandler}
              >
                {verify ? "Verified" : "Verify User"}
              </Button>
              {activatePremium&&<div>
                <i class="fa-solid fa-sun fa-lg" style={{verticalAlign: 'middle'}}></i>
                <label class="switch">
                  <input type="checkbox" onClick={setTheme} />
                  <span class="slider round"></span>
                </label>
                <i class="fa-solid fa-moon fa-lg" style={{verticalAlign: 'middle'}}></i>
              </div>}
              {premium && (
                <Button variant="success" type="button" onClick={activation}>
                  {activatePremium? 'Deactivate Premium':'Activate Premium'}
                </Button>
              )}
              {activatePremium &&<a href={Url} download='Expenses.csv'><i class="fa-solid fa-download fa-lg" ></i></a>}
              <Button variant="danger" onClick={logoutHandler}>
                LOGOUT
              </Button>
            </Container>
          </Navbar>
          <ExpenseForm />
        </>
      )}
      {profile && <ProfileDisplay profile={setProfileHandler} />}
      {!login && (
        <Route>
          <Redirect to="/" />
        </Route>
      )}
      
    </>
    </>
  );
};

export default WELCOME;
