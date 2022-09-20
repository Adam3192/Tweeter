import axios from 'axios'
import { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import TweetContext from './TweetContext'

export const TweetProvider = (props) => {

  const [tweet, setTweet] = useState([])
  const [currentUserTweets, setCurrentUserTweets] = useState([])
  const [thisUser, setThisUser] = useState([])
  
  const baseUrl = 'http://localhost:3000/tweeter/'

  useEffect(() => {
    
    async function fetchData() {
      await getAllTweets()
    }

    fetchData()
  }, [])

  function getAllTweets() {
    return axios.get(baseUrl).then((response) => setTweet(response.data))
  }

  function getTweet(id) {
    return axios
      .get(baseUrl + id)
      .then((response) => new Promise((resolve) => resolve(response.data)))
      .catch(
        (error) => new Promise((_, reject) => reject(error.response.statusText))
      )
  }

  function getUserTweets(name) {
    return axios
      .get(baseUrl + name)
      .then((response) => {
        console.log(`response is ${response.data}`)
        setCurrentUserTweets(response.data)
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

  let { username } = thisUser;
  console.log(username)
  console.log(thisUser);
  console.log(currentUserTweets);
  // console.log(Object.values(thisUser));



  function addTweet(name, message, createdAt) {
    let myHeaders = {
      Authorization: `Bearer ${sessionStorage.getItem('myTweetToken')}`,
    }
    let tweet = { name, message, createdAt }
    return axios
      .post(baseUrl, tweet, { headers: myHeaders })
      .then((response) => {
        getAllTweets()
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function editTweet(tweet) {
    let myHeaders = {
      Authorization: `Bearer ${sessionStorage.getItem('myTweetToken')}`,
    }

    return axios
      .put(baseUrl + tweet._id, tweet, { headers: myHeaders })
      .then((response) => {
        getAllTweets()
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function deleteTweet(id) {
    let myHeaders = {
      Authorization: `Bearer ${sessionStorage.getItem('myTweetToken')}`,
    }

    axios
      .delete(baseUrl + id, { headers: myHeaders })
      .then(() => {
        getAllTweets()
      })
      .catch((error) => {
        console.log(error)
        // navigate('/signin')
      })
  }

  return (
    <TweetContext.Provider
      value={{
        tweet,
        currentUserTweets,
        thisUser,
        getTweet,
        addTweet,
        editTweet,
        deleteTweet,
        getUserTweets,
        getThisUser
      }}
    >
      {props.children}
    </TweetContext.Provider>
  )
}
