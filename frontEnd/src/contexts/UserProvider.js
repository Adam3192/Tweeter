import axios from 'axios'
import UserContext from './UserContext'
import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useState } from 'react'

export const UserProvider = (props) => {
  let [thisUser, setThisUser] = useState({})
  
  const baseUrl = 'http://localhost:3000/users/'

  function createUser(username, password, firstName, lastName, city, state) {
    let user = { username, password, firstName, lastName, city, state }

    return axios.post(baseUrl, user).then((response) => {
      return new Promise((resolve) => resolve(response.data))
    })
  }

  function signInUser(username, password) {
    let user = { username, password }

    return axios.post(`${baseUrl}/login`, user).then((response) => {
      localStorage.setItem('myTweetToken', response.data.token)
      return new Promise((resolve) => resolve(response.data))
    })
  }

  function getThisUser(name) {
    return axios
      .get(`http://localhost:3000/tweeter/user/${name}`)
      .then((response) => {
        console.log(`response is ${response.data}`)
        setThisUser(response.data)
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function getCurrentUser() {
    let reqHeaders = {
      Authorization: 'Bearer ' + localStorage.getItem('myTweetToken')
    }

    return axios.get(`${baseUrl}/oneUser`, { headers: reqHeaders }).then((response) => {
      console.log(`this user is ${response.data.username}`)
      return new Promise((resolve) => resolve(response.data))
    } );

  }

  function getCurrentUser2() {
    return axios.get(`${baseUrl}/thisUser`).then((response) => {
      console.log(`this user is ${response.data.username}`)
      return new Promise((resolve) => resolve(response.data))
    } );
  }

  async function logout() {
    await localStorage.removeItem('myTweetToken')
    // navigate('/tweeter')

    //  <Navigate to="/dashboard"  />
    // window.location.reload()
  }


  return (
    <UserContext.Provider
      value={{
        createUser,
        signInUser,
        getCurrentUser,
        getCurrentUser2,
        logout,
        getThisUser,
        thisUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
