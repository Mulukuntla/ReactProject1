// Write your code at relevant places in the code below:

import React, { useEffect, useState,useReducer,useContext,useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

import AuthContext from "../../store/auth-context";
const emailReducer=(state,action)=>{
    if(action.type==="USER_INPUT"){
        return {value:action.payload,isValid:action.payload.includes("@")}
    }
    if(action.type==="INPUT_BLUR"){
        return {value:state.value,isValid:state.value.includes("@")}
    }
    return {value:"",isValid:false}

}

const passwordReducer=(state,action)=>{
    if(action.type==="USER_INPUT"){
        return {value:action.payload,isValid:action.payload.trim().length>6}
    }
    if(action.type==="INPUT_BLUR"){
        return {value:state.value,isValid:state.value.trim().length>6}
    }
    return {value:"",isValid:false}

}


const Login = () => {
  
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchState]=useReducer(emailReducer,{
    value:"",
    isValid:null,
  })
  const [passwordState,dispatchPasswordState]=useReducer(passwordReducer,{
    value:"",
    isValid:null,
  })


  const {isValid:emailIsValid}=emailState
  const {isValid:passwordIsValid}=passwordState
  
  const emailRef=useRef(null)
  console.log(emailRef)
  useEffect(()=>{
    console.log("hi")
    emailRef.current.focus()

  },[])
  useEffect(()=>{
    const timer=setTimeout(()=>{
        setFormIsValid(emailIsValid && passwordIsValid)

    },500)
    return ()=>{
        clearTimeout(timer)
    }


  },[emailIsValid,passwordIsValid])


  const emailChangeHandler = (event) => {
    dispatchState({type:"USER_INPUT",payload:event.target.value})
    
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({ type: "USER_INPUT", payload: event.target.value })

  };

  const validateEmailHandler = () => {
    dispatchState({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({type:"INPUT_BLUR"})
  };
  const authCtx=useContext(AuthContext)


  const submitHandler = (event) => {
    event.preventDefault();
   
    authCtx.onLogin(emailState.value, passwordState.value);
      
    
  };


  console.log("hii")
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
