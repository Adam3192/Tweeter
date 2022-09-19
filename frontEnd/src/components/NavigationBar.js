import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import TweetContext from '../contexts/TweetContext'
import Navbar from 'react-bootstrap/Navbar'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import Image from '../Images/bird.png'
import './NavigationBar.css'

const NavigationBar = () => {
  let [user, setUser] = useState({})
  let { logout } = useContext(UserContext)
  let loggedIn = sessionStorage.getItem('myTweetToken')
  let navigate = useNavigate()

  let { getCurrentUser } = useContext(UserContext)

  useEffect(() => {
    async function fetch() {
      await getCurrentUser().then((response) => {
        setUser(response)
      })
    }

    fetch()
  }, [loggedIn])

  return (
    <div>
      <Navbar className="color" bg="" variant="">
        <Container>
          <Navbar.Brand className="marginRight center" href="/">
            <img alt="" src={Image} className="d-inline-block align-top" />{' '}
            Tweeter
          </Navbar.Brand>
          <Nav className="me-auto">
            {!loggedIn ? (
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
            ) : (
              ''
            )}
            {!loggedIn ? (
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            ) : (
              ''
            )}
            {loggedIn ? (
              <Link to={`/tweeter/user/${user.username}`} className="nav-link">
                {`Welcome, ${user.firstName} ${user.lastName}!`}
              </Link>
            ) : (
              ''
            )}
            {loggedIn ? (
              <Link  to={`/tweeter/user/${user.username}`} className="nav-link">
                View Profile
              </Link>
            ) : (
              ''
            )}
            {/* {loggedIn ? (
           <Link onClick={navigation() } to="/" className="nav-link">
             Logout
           </Link>
         ) : (
           ''
         )} */}
            {/* {loggedIn ? (
           <Link onClick={logout && <Navigate to="/tweeter"   /> } to="/" className="nav-link">
             Logout
           </Link>
         ) : (
           ''
         )} */}
            {loggedIn ? (
              <Link onClick={logout} to="/" className="nav-link">
                Logout
              </Link>
            ) : (
              ''
            )}
            <Link to="/" className="nav-link">
              All Tweets
            </Link>
          </Nav>
        </Container>
        {/* <Form className="me-4">
       <FormControl
         //   onChange={handleChange}
         type="search"
         className="me-4"
         placeholder="Search"
         aria-label="search"
       />
     </Form> */}
      </Navbar>
      {/* <Stack gap={3} className="col-md-10 mx-auto mt-3 mb-5"> */}
      <Outlet />
      {/* </Stack> */}
    </div>
  )
}

export default NavigationBar
