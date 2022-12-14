import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TweetContext from '../contexts/TweetContext'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import './EditTweet.css'

const EditTweet = () => {
  let params = useParams()
  let [editedTweet, setEditedTweet] = useState({
    id: '',
    name: '',
    message: '',
  })
  
  const [id, setId] = useState(params._id)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [updatedAt, setUpdatedAt] = useState(moment().format('M/D/YYYY, h:mm:ss a'))
  
  let { editTweet, getTweet } = useContext(TweetContext)
  let navigate = useNavigate()
  
  useEffect(() => {
    if (params._id === undefined) return
    async function fetch() {
      await getTweet(params._id).then((tweet) => {
        setEditedTweet(tweet)
        setName(tweet.name)
      })
    }
    fetch()
  }, [params._id])

  useEffect(() => {
    if (params._id === undefined) return
    async function fetch() {
      await getTweet(params._id).then((tweet) =>  setEditedTweet(tweet))
    }
    fetch()
  }, [params._id])
  
  function handleChange(event) {
    setEditedTweet((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value }
    })
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    editTweet( name, message, updatedAt, id)
    .then(() => {
      navigate('/tweeter')
    })
    .catch((error) => {
      console.log(error)
      navigate('/signin')
    })
  }
  
  
  
  
  
  
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container1">
          <textarea
            className='editTweet'
            type="text"
            name="message"
            value={editedTweet.message}
            // onChange={(e) => setMessage(e.target.value)}
            onChange={(e) => {
              setMessage(e.target.value)
              setEditedTweet(e.target.value)
            }}
          />
          <Button type='submit' className="style2 ml-10"  variant="info">Update</Button>
        </div>
      </form>
    </div>
  )
}

export default EditTweet
