import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TweetContext from '../contexts/TweetContext'
import UserContext from '../contexts/UserContext'
import moment from 'moment'
import Button from 'react-bootstrap/Button'

const NewPost = () => {
  let { addTweet, getTweet } = useContext(TweetContext)
  let { getCurrentUser } = useContext(UserContext)
  let [user, setUser] = useState({})
  let loggedIn = sessionStorage.getItem('myTweetToken')
  let navigate = useNavigate()
  const [name, setName] = useState({})
  const [message, setMessage] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  useEffect(() => {
    async function fetch() {
      await getCurrentUser().then((response) => {
        setName(response)
      })
    }

    fetch()
  }, [])

  useEffect(() => {
    function getTime() {
      let time = moment().format('M/D/YYYY, h:mm:ss a')
      setCreatedAt(time)
    }

    getTime()
  }, [message])

  // function handleChange(event) {
  //   setNewTweet((prevValue) => {
  //     return { ...prevValue, [event.target.name]: event.target.value }
  //     return { [event.target.name]: event.target.value }
  //   })
  // }

  function handleSubmit(event) {
    event.preventDefault()
    addTweet(name.username, message, createdAt)
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
        <div className="container5">
          <textarea
            className='newTweetStyle'
            placeholder="New tweet"
            type="text"
            name="message"
            // value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type='submit' className="style2 ml-10"  variant="info">Post!</Button>
        </div>
      </form>
    </div>
  )
}

export default NewPost
