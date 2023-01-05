import React, { useEffect, useState, useContext } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SearchUsers from './components/SearchUsers'
import SearchUsersBackup from './components/SearchUsersBackup'
import SearchUsersBackup2 from './components/SearchUsersBackup2'
import TweetList from './components/TweetList'
import NewTweet from './components/NewTweet'
import UserProfile from './components/UserProfile'
import UserProfile2 from './components/UserProfile2'
import EditTweet from './components/EditTweet'
import NavigationBar from './components/NavigationBar'
import DeleteTweet from './components/DeleteTweet'
import { TweetProvider } from './contexts/TweetProvider'
import { UserProvider } from './contexts/UserProvider'
import UserContext from './contexts/UserContext'
import './App.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<NavigationBar />}>
            <Route exact path="/" element={<TweetList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<SearchUsersBackup2 />} />
            <Route path="/tweeter/new" element={<NewTweet />} />
            <Route path="/tweeter/user/:name" element={<UserProfile />} />
            <Route path="/tweeter/user2/:name" element={<UserProfile2 />} />
            <Route path="/tweeter/:_id" element={<EditTweet />} />
            <Route path="/tweeter/delete/:_id" element={<DeleteTweet />} />
            <Route path="/tweeter" element={<TweetList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
