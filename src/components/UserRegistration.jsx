import React, { Component } from 'react'
import BackendService from '../services/BackendService';
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox
}from 'mdb-react-ui-kit';


class UserRegistration extends Component {
  constructor(props) {
    super(props)

    // Bind the onChnage event to this object
    this.onChangeHandler = this.onChangeHandler.bind(this);
    //create a state to hold the user input values
    this.state = {
      FormInput_name: '',
      FormInput_emailId: '',
      FormInput_mobileNo: '',
      FormInput_password: '',
      FormInput_repeat_password: '',
      FormInput_subs_Newsletter: 'false',
      FormInput_ModifiedBy: '',
      IsUserExists: false
    }
  }

  // Handle the onChnage event and set user intput to state variable
  onChangeHandler = (e) => {
    switch (e.target.id) {
      case "name":
        this.setState({ FormInput_name: e.target.value });
        break;
      case "emailId":
        this.setState({ FormInput_emailId: e.target.value });
        break;
      case "mobileNo":
        this.setState({ FormInput_mobileNo: e.target.value });
        break;
      case "password":
        this.setState({ FormInput_password: e.target.value });
        break;
      case "repeat_password":
        this.setState({ FormInput_repeat_password: e.target.value });
        break;
      case "subs_Newsletter":
        this.setState({ FormInput_subs_Newsletter: e.target.checked.toString() });
        break;
    }
  }

  createUser = (e) => {
    e.preventDefault();

    // Create a user object to pass to backend API
    let UserObj = {
      Name: this.state.FormInput_name,
      EmailID: this.state.FormInput_emailId,
      MobileNo: this.state.FormInput_mobileNo,
      Password: this.state.FormInput_password,
      Subs_Newsletter: this.state.FormInput_subs_Newsletter,
      VerificationCode: ''


    };
    // write to console to checj if object is correcly formated and have all required fields
   // console.log('User => ' + JSON.stringify(UserObj));

    // validation the mandatory input fields
    if (UserObj.Name.length < 5) {
      alert('Invalid Form, enter your complete name having minimum 5 char')
      return
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(UserObj.EmailID)) {
      alert('Invalid Form, enter a valid email address')
      return
    }
  
    if (UserObj.MobileNo.length != 9) {
      alert('Invalid Form, enter valid mobile number of 9 digit')
      return
    }
    if (UserObj.Password.length < 3 || UserObj.Password.length > 15) {
      alert('Invalid Form, enter a password having minimum 8 and maximum 15 digit')
      return
    }
    if (UserObj.Password != this.state.FormInput_repeat_password) {
      alert('Invalid Form, repeat password does not match with password');
      return
    }
    let parmObj = {
      parmName: 'EmailID',
      paramValue: this.state.FormInput_emailId,

    };
    // email existence validation
    BackendService.GetUserdataByParameter(JSON.stringify(parmObj)).then(res => {

      if (res.data.emailID != null || res.data.emailID!= undefined) {
        alert('Entered email ID already exists');
        return
      }
      else {
        
        BackendService.createUser(JSON.stringify(UserObj)).then(res => {

          alert('Your registration is successful');
    
          // after form submitted to server, clear all valued from from.
          this.state = {
            FormInput_name: '',
            FormInput_emailId: '',
            FormInput_mobileNo: '',
            FormInput_password: '',
            FormInput_repeat_password: '',
            FormInput_subs_Newsletter: 'false',
            FormInput_IsVerified: 'false',
            FormInput_VerificationCode: '',
            FormInput_IsActive: 'false',
            FormInput_ModifiedBy: ''
          };
    
          // Reload the form to refrsh it
          window.location.reload(true);
    
        });

      }


    });

    // call api
  


  }


// ********** HTML
  render() {
    return (
      <MDBContainer class="d-flex justify-content-center">

        <MDBCard className='w-50' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <h4 className="fw-normal mb-5" style={{ color: '#4835d4' }}>Sign up Infomation</h4>

                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your Full Name' id='name' type='text' value={this.state.FormInput_name} onChange={this.onChangeHandler} />
                </div>
                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email Address' id='emailId' type='email' value={this.state.FormInput_emailId} onChange={this.onChangeHandler} />
                </div>
                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="phone me-3" size='lg' />
                  <MDBInput label='Your Mobile Number' id='mobileNo' type='Number' value={this.state.FormInput_mobileNo} onChange={this.onChangeHandler} />
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Your Password' id='password' type='password' value={this.state.FormInput_password} onChange={this.onChangeHandler} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Repeat your password' id='repeat_password' type='password' value={this.state.FormInput_repeat_password} onChange={this.onChangeHandler} />
                </div>

                <div className='mb-4'>
                  <MDBCheckbox id='subs_Newsletter' label='Subscribe to our newsletter' onChange={this.onChangeHandler} />
                </div>

                <MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={this.createUser}>Register</MDBBtn>

              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-1 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' fluid />
              </MDBCol>

            </MDBRow>
          </MDBCardBody>
        </MDBCard>

      </MDBContainer>
    )
  }
}


export default UserRegistration
