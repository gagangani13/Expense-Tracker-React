import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
const ExpenseForm = () => {
  useEffect(() => {
    fromFirebase();
  }, []);

  async function fromFirebase() {
    setLoad(true)
    const response = await fetch(
      `https://signup-and-authenticatio-f712f-default-rtdb.firebaseio.com/Users/${localStorage.getItem(
        "Token"
      )}.json`
    );
    const data = await response.json();
    try {
      if (response.ok) {
        amountRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "";
        console.log(data);
        let arr = [];
        for (const item in data) {
          arr.unshift({
            amount: data[item].amount,
            description: data[item].description,
            category: data[item].category,
            Id: item,
          });
        }
        setLoad(false)
        setExpenses(arr);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(data.error.message);
    }
  }

  const [expenses, setExpenses] = useState([]);
  const[load,setLoad]=useState(false)
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  async function addExpenses(e) {
    e.preventDefault();
    setLoad(true)
    const details = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    if (localStorage.getItem("EditKey") === null) {
      const response = await fetch(
        `https://signup-and-authenticatio-f712f-default-rtdb.firebaseio.com/Users/${localStorage.getItem(
          "Token"
        )}.json`,
        {
          method: "POST",
          body: JSON.stringify(details),
        }
      );
      const data = await response.json();
      try {
        setLoad(false)
        if (response.ok) {
          amountRef.current.value = "";
          descriptionRef.current.value = "";
          categoryRef.current.value = "";
          fromFirebase();
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(data);
        alert(data.error.message);
      }
    } else {
      const response = await fetch(
        `https://signup-and-authenticatio-f712f-default-rtdb.firebaseio.com/Users/${localStorage.getItem(
          "Token"
        )}/${localStorage.getItem("EditKey")}.json`,
        {
          method: "PUT",
          body: JSON.stringify(details),
        }
      );
      const data = await response.json();
      try {
        setLoad(false)
        if (response.ok) {
          amountRef.current.value = "";
          descriptionRef.current.value = "";
          categoryRef.current.value = "";
          localStorage.removeItem("EditKey");
          fromFirebase();
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(data);
        alert(data.error.message);
      }
    }
  }
  async function deleteExpense(e) {
    setLoad(true)
    const key = e.target.parentElement.id;
    const response = await fetch(
      `https://signup-and-authenticatio-f712f-default-rtdb.firebaseio.com/Users/${localStorage.getItem(
        "Token"
      )}/${key}.json`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    try {
        setLoad(false)
      if (response.ok) {
        fromFirebase();
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(data.error.message);
    }
  }
  async function editExpense(e) {
    setLoad(true)
    const key = e.target.parentElement.id;
    const response = await fetch(
      `https://signup-and-authenticatio-f712f-default-rtdb.firebaseio.com/Users/${localStorage.getItem(
        "Token"
      )}/${key}.json`
    );
    const data = await response.json();
    try {
        setLoad(false)
      if (response.ok) {
        amountRef.current.value = data.amount;
        descriptionRef.current.value = data.description;
        categoryRef.current.value = data.category;
        localStorage.setItem("EditKey", key);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(data.error.message);
    }
  }
  return (
    <>
      <Form
        style={{
          position: "relative",
          top: "10rem",
          width: "60%",
          left: "20%",
          textAlignLast: 'center'
        }}
        onSubmit={addExpenses}
      >
        <h3>ADD EXPENSES</h3>
        <Row>
          <Col>
            <Form.Control
              placeholder="Amount"
              type="number"
              ref={amountRef}
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Description"
              type="text"
              ref={descriptionRef}
              required
            />
          </Col>
          <Col>
            <Form.Select defaultValue="Me" ref={categoryRef} required>
              <option>Me</option>
              <option>Family</option>
              <option>Friends</option>
            </Form.Select>
          </Col>
          <Col>
            <Button variant="dark" type="submit">
              ADD
            </Button>
          </Col>
        </Row>
      </Form>
      <div
        style={{
          position: "relative",
          top: "20rem",
          width: "60%",
          left: "20%",
          textAlignLast: 'center'
        }}
      >
        {load&&<h5>Loading...</h5>}
        {expenses.map((item) => {
          return (
            <Card>
              <Card.Body
                id={item.Id}
                className="d-flex justify-content-around align-items-baseline"
              >
                <Card.Text>Rs.{item.amount} </Card.Text>
                <Card.Text>{item.description} </Card.Text>
                <Card.Text>{item.category}</Card.Text>
                <button
                  onClick={editExpense}
                  class="fa-solid fa-pen"
                  style={{ padding: "5px", borderRadius: "1rem" }}
                ></button>
                <button
                  onClick={deleteExpense}
                  class="fa-solid fa-trash-can"
                  style={{
                    color: "#d90d0d",
                    padding: "5px",
                    borderRadius: "1rem",
                  }}
                ></button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ExpenseForm;
