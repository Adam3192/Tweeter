import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TweetContext from '../contexts/TweetContext'

const EditTweet = () => {
  let params = useParams()
  let [editedTweet, setEditedTweet] = useState({
    id: params._id,
    name: '',
    description: '',
    price: 0,
  })

  let { editTweet, getTweet } = useContext(TweetContext)
  let navigate = useNavigate()
  let { id, name, message, createdAt } = editedTweet
  // let id = params._id

  useEffect(() => {
    if (id === undefined) return
    async function fetch() {
      await getTweet(id).then((tweet) => setEditedTweet(tweet))
    }
    fetch()
  }, [id])

//   useEffect(() => {
//     getTweet(tweet._id)
//   }, [])

  function handleChange(event) {
    setEditedTweet((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    editTweet(editedTweet)
      .then(() => {
        navigate('/tweeter')
      })
      .catch((error) => {
        console.log(error)
        navigate('/signin')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>EDIT TWEET</h1>
      <span>Username </span>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <span>Message </span>
      <input
        type="text"
        name="message"
        value={message}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <button>Edit Tweet</button>
    </form>
  )
}

export default EditTweet
