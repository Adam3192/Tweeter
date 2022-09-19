import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TweetContext from '../contexts/TweetContext'
import UserContext from '../contexts/UserContext'

const NewPost = () => {
  let { addTweet, getTweet } = useContext(TweetContext)
  let { getCurrentUser } = useContext(UserContext)
  let [user, setUser] = useState({})
  let loggedIn = sessionStorage.getItem('myTweetToken')
  let navigate = useNavigate()
  const [name, setName] = useState({});
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    async function fetch() {
      await getCurrentUser().then((response) => {
        setName(response)
        // setName(response.data.username)
        console.log(`monday 19 response is ${response}`)
      })
    }
    
    fetch()
  }, [])
  

  console.log(`monday 19, username is ${user.username}`)

  // let [newTweet, setNewTweet] = useState({
  //   name: 'Adam',
  //   message: '',
  // })

  // function handleChange(event) {
  //   setNewTweet((prevValue) => {
  //     return { ...prevValue, [event.target.name]: event.target.value }
  //     return { [event.target.name]: event.target.value }
  //   })
  // }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(`monday 19, new tweet is ${message}`)
    addTweet(name.username, message)
      .then((response) => {
        navigate('/tweeter')
        console.log(`monday 19, response is ${response}`)
      })
      .catch((error) => {
        console.log(error)
        navigate('/signin')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New tweet"
        type="text"
        name="message"
        // value={newTweet.message}
        // onChange={handleChange}
        onChange={e => setMessage(e.target.value)}
      />
      <button>Post!</button>
    </form>
  )
}

export default NewPost
