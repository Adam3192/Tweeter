import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TweetContext from '../contexts/TweetContext'

const NewTweet = () => {
  let params = useParams()
  let { addTweet, getTweet } = useContext(TweetContext)
  let [timeCreated, setTimeCreated] = useState()
  var timeNow = new Date().getTime();
  
  let [newTweet, setNewTweet] = useState({
    //update these properties after I define my models in the database!!
    id: params._id,
    name: '',
    message: '',
    createdAt: ''
  })

  let navigate = useNavigate()
  let { id, name, message, createdAt } = newTweet

  useEffect(() => {
    if (id === undefined) return
    async function fetch() {
      await getTweet(id).then((tweet) => setNewTweet(tweet))
    }
    fetch()
  }, [id])

  function handleChange(event) {
    setNewTweet((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    addTweet(newTweet)
      .then((response) => {
        setTimeCreated(response.createdAt)
        navigate('/tweeter')
      })
      .catch((error) => {
        console.log(error)
        navigate('/signin')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>NEW TWEET</h1>
      <span>Username </span>
      <input
        placeholder="Enter tweet name"
        type="text"
        name="name"
        value={newTweet.name}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <span>Message </span>
      <input
        placeholder="Enter message"
        type="text"
        name="message"
        value={newTweet.message}
        onChange={handleChange}
      />
      <button>Post Tweet!</button>
    </form>
  )
}

export default NewTweet
