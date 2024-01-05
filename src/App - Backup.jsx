import { useState } from 'react'
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import FooterComponent from './components/FooterComponent';
import UserRegistration from './components/UserRegistration';
import Product from './components/Product';
import Login from './components/Login';
import ListUser from './components/ListUser';
import {
  MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink,
  MDBNavbarToggler, MDBNavbarBrand, MDBCollapse 
} from 'mdb-react-ui-kit';

function App() {
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);


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
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
          
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 ' >
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/'> Home </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
              <MDBNavbarLink href='/'>Menu</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className='justify-content-end'>
                <MDBNavbarLink href='/Login'>Login</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/UserRegistration'>Sign Up</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
              <MDBNavbarLink href='/ListUser'>User</MDBNavbarLink>
            </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <div className="App container" >
          <br />
          <Routes>
          <Route path='/' element={<Product/>}></Route>
          <Route path='/UserRegistration' element={<UserRegistration/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/ListUser' element={<ListUser/>}></Route>
          </Routes>
        </div>
      </Router>
      <div className="fixed-bottom">
      <FooterComponent />
      </div>
      </div>
  );
} export default App