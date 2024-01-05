import React, { Component } from 'react'
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BackendService from '../services/BackendService';
import { useSelector, useDispatch } from "react-redux";
import * as setLoggedUser from "../actions/LoggedInUser.jsx";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { variables } from './Variables.jsx';
import {
         MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox
        } from 'mdb-react-ui-kit';


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // set in globle state
  const [IsUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setuserId] = useState('');
  const [userName, setuserName] = useState('');
  const [userRole, setuserRole] = useState('');
  const [FormInput_emailId, setFormInput_emailId] = useState('');
  const [FormInput_password, setFormInput_password] = useState('');


  // Handle the onChnage event and set user intput to state variable
  function onChangeHandler(e) {
    console.log(e.target.id + ':' + e.target.value);
    switch (e.target.id) {
      case "loginId":
        setFormInput_emailId(e.target.value);
        break;
      case "Password":
        setFormInput_password(e.target.value);
        break;

    }
  }

  function btnUserLogin(e) {
    e.preventDefault();


    let objLogin = {
      EmailID: FormInput_emailId,
      Password: FormInput_password
    };

    console.log('data for api' + JSON.stringify(objLogin));
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(objLogin.EmailID)) {
      alert('Invalid Form, enter a valid email address')
      return
    }
    if (objLogin.Password.length < 3 || objLogin.Password.length > 15) {
      alert('Invalid Form, enter a password having minimum 8 and maximum 15 digit')
      return
    }
    // call api
    BackendService.UserLogin(JSON.stringify(objLogin)).then(res => {

      if (res.data.id===0 || res.data.id === null || res.data.id === undefined) {
       alert('Invalid login ID or Password');
        return

      }
      else {

        // setting up cookies
        bake_cookie(variables.key_IsUserLoggedIn, 'true');
        bake_cookie(variables.key_userRole, res.data.userRole);
        bake_cookie(variables.key_userName, res.data.name);
        bake_cookie(variables.key_userId, res.data.id);
        bake_cookie(variables.key_imageName, res.data.imageName);

        // dispatching action to set logged user data to redux store
        dispatch(setLoggedUser.setIsUserLoggedIn('true'));
        dispatch(setLoggedUser.setUserEmailId(res.data.EmailID));
        dispatch(setLoggedUser.setUserId(res.data.id));
        dispatch(setLoggedUser.setUserName(res.data.Name));
        dispatch(setLoggedUser.setUserRole(res.data.userRole));
        //alert('Login is successful');
        navigate('/');
      }
    });
  }


  return (
    <>
      <MDBContainer class="d-flex justify-content-center">
        <MDBCard className='w-50'>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <h4 className="fw-normal mb-5" style={{ color: '#4835d4' }}>User Login Form</h4>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your login ID' id='loginId' type='text' className='w-100' onChange={onChangeHandler} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Your password' id='Password' type='password' onChange={onChangeHandler} />
                </div>



                <MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={btnUserLogin}>Login</MDBBtn>

              </MDBCol>

              <MDBCol md='2' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>

            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  )
} export default Login
