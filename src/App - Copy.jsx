import { useState } from 'react'
import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import FooterComponent from './components/FooterComponent';
import UserRegistration from './components/UserRegistration';
import Product from './components/Product';
import Login from './components/Login';
import ListUser from './components/ListUser';
import ProfileViewPage from './components/ProfileViewPage';
import { useSelector, useDispatch } from "react-redux";
import * as changeLoggedUser from "./actions/LoggedInUser.jsx";

import {
  MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink,
  MDBNavbarToggler, MDBNavbarBrand, MDBCollapse
} from 'mdb-react-ui-kit';

function App() {

  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmailId, setuserEmailId] = useState('');
  const [userId, setuserId] = useState('');
  const [userName, setuserName] = useState('');
  const [userRole, setuserRole] = useState('admin');

  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);

  const dispatch = useDispatch();

  const userLoggedId = useSelector((state) => state.LoginReducer);
  // setIsLoggedIn(user.IsUserLoggedIn)
 
  return (
    <div>
      <Router>
        <MDBNavbar expand='lg' dark bgColor='primary'>
          <MDBContainer fluid>
            <MDBNavbarBrand href='#'>Doce e oriental-Ana</MDBNavbarBrand>
            <MDBNavbarToggler
              type='button'
              data-target='#navbarColor02'
              aria-controls='navbarColor02'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowNavColor(!showNavColor)}>
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse show={showNavColor} navbar>
              <MDBNavbarNav left >
                <MDBNavbarItem>
                  <MDBNavbarLink aria-current='page' href='/'> </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink aria-current='page' href='/'> Home </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/'>Menu</MDBNavbarLink>
                </MDBNavbarItem>

                {JSON.stringify(userLoggedId.userRole) === JSON.stringify('admin') ?
                  <MDBNavbarItem>
                    <MDBNavbarLink href='/'>Order</MDBNavbarLink>
                  </MDBNavbarItem>
                  :
                  <MDBNavbarItem>
                  </MDBNavbarItem>
                }

                {JSON.stringify(userLoggedId.userRole) === JSON.stringify('admin') ?
                  <MDBNavbarItem>
                    <MDBNavbarLink href='/ListUser'>User List</MDBNavbarLink>
                  </MDBNavbarItem>
                  :
                  <MDBNavbarItem>
                  </MDBNavbarItem>
                }

              </MDBNavbarNav>
              <MDBNavbarNav className='justify-content-end'>
                <MDBNavbarItem>
                  <MDBNavbarLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="twitter" />
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                </MDBNavbarItem>
                {userLoggedId.IsUserLoggedIn ?
                  <MDBNavbarItem>
                  </MDBNavbarItem>
                  :
                  <MDBNavbarItem>
                    <MDBNavbarLink href='/UserRegistration'>
                      <MDBIcon far icon="sign-up" />Sign Up
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                }

                {userLoggedId.IsUserLoggedIn ?
                  <MDBNavbarItem>
                    <MDBNavbarLink className="waves-effect waves-light" href='/ProfileViewPage'>
                      {userLoggedId.userName}
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img(31).webp"
                        className="rounded-circle" height="22" alt="Avatar" loading="lazy" />
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  :
                  <MDBNavbarItem>
                    <MDBNavbarLink className="waves-effect waves-light" href='/Login'>
                      <MDBIcon far icon="user" />Login
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                }

              </MDBNavbarNav>

            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        <div className="App container" >
          <br />
          <Routes>
            <Route path='/' element={<Product />}></Route>
            <Route path='/UserRegistration' element={<UserRegistration />}></Route>
            <Route path='/Login' element={<Login />}></Route>
            <Route path='/ListUser' element={<ListUser />}></Route>
            <Route path='/ProfileViewPage' element={<ProfileViewPage />}></Route>
          </Routes>
        </div>
      </Router>
      <div className="fixed-bottom">
        <FooterComponent />
      </div >
    </div >
  );
} export default App