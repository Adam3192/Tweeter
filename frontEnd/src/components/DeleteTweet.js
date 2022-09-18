import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TweetContext from '../contexts/TweetContext'

const DeleteTweet = () => {
  let { deleteTweet, getAllTweets } = useContext(TweetContext)
  let navigate = useNavigate()
  let params = useParams()
  let id = params._id
  let loggedIn = sessionStorage.getItem('myTweetToken')


function handleDelete(id) {
 deleteTweet(id)
}


  return loggedIn
    ? handleDelete(id).then(() => {
        navigate('/tweeter')
      })
    : navigate('/signin')

  // deleteTweet(id)
  //  .then(() => {
  //    getAllTweets()
  //  })
  //  .catch((error) => {
  //    console.log(error)
  //    navigate('/signin')
  //  })
}

export default DeleteTweet
