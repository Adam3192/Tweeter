import axios from 'axios'
import { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import TweetContext from './TweetContext'

export const TweetProvider = (props) => {

  let params = useParams()


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
      .get(`http://localhost:3000/tweeter/tweet/${id}`)
      .then((response) => new Promise((resolve) => resolve(response.data)))
      .catch(
        (error) => new Promise((_, reject) => reject(error.response.statusText))
      )
  }

  function getUserTweets(name) {
    return axios
      .get(baseUrl + name)
      .then((response) => {
        setCurrentUserTweets(response.data)
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function getThisUser(name) {
    return axios
      .get(`http://localhost:3000/tweeter/user/${name}`)
      .then((response) => {
        setThisUser(response.data)
        return new Promise((resolve) => resolve(response.data))
      })
  }

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

  function editTweet( name, message, updatedAt, id) {
    let myHeaders = {
      Authorization: `Bearer ${sessionStorage.getItem('myTweetToken')}`,
    }
    let tweet = { name, message, updatedAt }

    return axios
      .put(baseUrl + id, tweet, { headers: myHeaders })
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
