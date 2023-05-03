import React, { useEffect, useRef,useState } from 'react'
import {Card, Form,Row,Col,Button } from 'react-bootstrap'
const ExpenseForm = () => {
    
    useEffect(()=>{
        async function fromFirebase() {
            const response = await fetch(
                `https://signup-and-authenticatio-f712f-default-rtdb.firebaseio.com/Users/${localStorage.getItem('Token')}.json`
              );
              const data = await response.json();
              try {
                if (response.ok) {
                    amountRef.current.value=''
                    descriptionRef.current.value=''
                    categoryRef.current.value=''
                    console.log(data);
                    let arr=[];
                    for(const item in data){
                        arr.push({amount:data[item].amount,description:data[item].description,category:data[item].category})
                    }
                    setExpenses(arr)
                  
                } else {
                  throw new Error();
                }
              } catch (error) {
                alert(data.error.message);
              }
        }
        fromFirebase()
    },[])

    const [expenses,setExpenses]=useState([])
    const amountRef=useRef()
    const descriptionRef=useRef()
    const categoryRef=useRef()
    async function addExpenses(e){
        e.preventDefault()
        const details={amount:amountRef.current.value,description:descriptionRef.current.value,category:categoryRef.current.value}
        setExpenses([details,...expenses])
        const response = await fetch(
            `https://signup-and-authenticatio-f712f-default-rtdb.firebaseio.com/Users/${localStorage.getItem('Token')}.json`,
            {
              method: "POST",
              body: JSON.stringify(details),
            }
          );
          const data = await response.json();
          try {
            if (response.ok) {
                amountRef.current.value=''
                descriptionRef.current.value=''
                categoryRef.current.value=''
              
            } else {
              throw new Error();
            }
          } catch (error) {
            console.log(data)
            alert(data.error.message);
          }
        
    }
  return (
    <>
    <Form style={{position:'relative',top:'10rem',width:'60%',left:'20%'}} onSubmit={addExpenses}>
        <h3>ADD EXPENSES</h3>
      <Row >
        <Col>
          <Form.Control placeholder="Amount" type='number' ref={amountRef} required/>
        </Col>
        <Col>
          <Form.Control placeholder="Description" type='text' ref={descriptionRef} required/>
        </Col>
        <Col>
        <Form.Select defaultValue="Me" ref={categoryRef}required>
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
            return <Card body>{`Amount:Rs.${item.amount}  Description:${item.description}  Category:${item.category}`}</Card>
        })}
    </div>
    </>
  )
}

export default ExpenseForm
