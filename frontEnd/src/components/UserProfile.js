import React, { useContext, useState, useEffect } from 'react'
import TweetContext from '../contexts/TweetContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './TweetList.css'
import UserContext from '../contexts/UserContext'

const UserProfile = () => {
  let { deleteTweet, getUserTweets } = useContext(TweetContext)
  let { getCurrentUser } = useContext(UserContext)
  let [currentTweets, setCurrentTweets] = useState([])
  let [user, setUser] = useState({})
  let navigate = useNavigate()

  let params = useParams()

  useEffect(() => {
    async function fetch() {
      await getCurrentUser().then((response) => {
        console.log(response)
        setUser(response)
      })
    }


    async function tweetList() {

      await getUserTweets(params.name).then((response) => {
        // console.log(`current user is ${response}`)
        setCurrentTweets(response)
      })
    }
    
    tweetList()
    fetch()
  }, [])

  function handleDelete(id) {
    deleteTweet(id).catch((error) => {
      console.log(error)
      navigate('/signin')
    })
    navigate('/tweeter')
  }

  return (
    <TweetContext.Consumer>
      {({ currentUserTweets }) => {
        return (
          <div className="container2">
            <div className="container3">
              <h1>{`User Profile:${user.firstName} ${user.lastName}`}</h1>
              <p>{`Name:${user.firstName} ${user.lastName}`}</p>
              <p>{`Location:${user.city},${user.state}`}</p>
              <p>{`Profile Created:${user.createdAt}`}</p>
              <br></br>
              <br></br>
              <br></br>
            </div>
            <div>
            
              {currentUserTweets.map((t) => {
                return (
                  <div className="tweet" key={t.id}>
                    <div className="container">
                      <h2>{t.name}</h2>
                      <p>{t.message}</p>
                      <p>{t.createdAt}</p>
                      <div className='container4'>
                      <Form action={`/tweeter/${t._id}`}>
                        <Button
                          className="ml-7"
                          variant="primary"
                          type="submit"
                        >
                          Edit
                        </Button>
                      </Form>

                      <Form onSubmit={handleDelete.bind(this, t._id)}>
                        <Button
                          className="ml-7"
                          variant="primary"
                          type="submit"
                          // onClick={handleDelete.bind(this, t._id)}
                        >
                          Delete
                        </Button>
                      </Form>
                      </div>
                
                    </div>
                    <p>{t.description}</p>
                    <br></br>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    </TweetContext.Consumer>
  )
}

export default UserProfile
