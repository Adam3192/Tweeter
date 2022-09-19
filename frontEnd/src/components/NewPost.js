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
  const [name, setName] = useState({})
  const [message, setMessage] = useState('')

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

  // function handleChange(event) {
  //   setNewTweet((prevValue) => {
  //     return { ...prevValue, [event.target.name]: event.target.value }
  //     return { [event.target.name]: event.target.value }
  //   })
  // }

  function handleSubmit(event) {
    event.preventDefault()
    addTweet(name.username, message)
      .then((response) => {
        window.location.reload()
        // navigate('/tweeter')
      })
      .catch((error) => {
        console.log(error)
        navigate('/signin')
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="New tweet"
          type="text"
          name="message"
          // value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='ml-10'>Post!</button>
      </form>
    </div>
  )
}

export default NewPost
