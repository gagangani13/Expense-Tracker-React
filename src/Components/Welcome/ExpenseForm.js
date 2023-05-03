import React, { useRef,useState } from 'react'
import {Card, Form,Row,Col,Button } from 'react-bootstrap'
const ExpenseForm = () => {
    const [expenses,setExpenses]=useState([])
    const amountRef=useRef()
    const descriptionRef=useRef()
    const chooseRef=useRef()
    function addExpenses(e){
        e.preventDefault()
        const data={amount:amountRef.current.value,description:descriptionRef.current.value,choose:chooseRef.current.value}
        console.log(data);
        setExpenses([data,...expenses])
    }
  return (
    <>
    <Form style={{position:'relative',top:'10rem',width:'60%',left:'20%'}} onSubmit={addExpenses}>
        <h3>ADD EXPENSES</h3>
      <Row >
        <Col>
          <Form.Control placeholder="Amount" type='number' ref={amountRef}/>
        </Col>
        <Col>
          <Form.Control placeholder="Description" type='text' ref={descriptionRef}/>
        </Col>
        <Col>
        <Form.Select defaultValue="Me" ref={chooseRef}>
            <option>Me</option>
            <option>Family</option>
            <option>Friends</option>
          </Form.Select>
        </Col>
        <Col>
            <Button variant="dark" type='submit'>ADD</Button>
        </Col>
      </Row>
    </Form>
    <div style={{position:'relative',top:'20rem',width:'60%',left:'20%'}}>
        {expenses.map((item)=>{
            return <Card body>{`Amount:Rs.${item.amount}  Description:${item.description}  Category:${item.choose}`}</Card>
        })}
    </div>
    </>
  )
}

export default ExpenseForm
