import React, { useContext, useState, useEffect } from 'react'
import TweetContext from '../contexts/TweetContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './TweetList.css'
import UserContext from '../contexts/UserContext'

const UserProfile2 = () => {
  let { deleteTweet, getUserTweets, getThisUser } = useContext(TweetContext)
  let { getCurrentUser2 } = useContext(UserContext)
  let [currentTweets, setCurrentTweets] = useState([])
  let [notUsed, setNotUsed] = useState([])
  let [user, setUser] = useState({})
  let navigate = useNavigate()
  let params = useParams()

  useEffect(() => {
    async function fetch() {
      await getCurrentUser2().then((response) => {
        console.log(response)
        setUser(response)
      })
    }

    async function tweetList() {
      await getUserTweets(params.name).then((response) => {
        setCurrentTweets(response)
      })
    }

    async function thisUser() {
      await getThisUser(params.name).then((response) => {
        setNotUsed(response)
      })
    }

    thisUser()
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
    <div>
      <TweetContext.Consumer>
        {({ thisUser, currentUserTweets }) => {
          return (
            <div className="container2">
              {thisUser.map((u) => {
                return (
                  <div className='container3'>
                    <h1>{`User Profile:${u.firstName} ${u.lastName}`}</h1>
                    <p>{`Name:${u.firstName} ${u.lastName}`}</p>
                    <p>{`Location:${u.city},${u.state}`}</p>
                    <p>{`Profile Created:${u.createdAt}`}</p>
                    <br></br>
                    <br></br>
                    <br></br>
                  </div>
                )
              })}
              <div>
                {currentUserTweets.map((t) => {
                  return (
                    <div className="tweet" key={t.id}>
                      <div className="container">
                        <h2>{t.name}</h2>
                        <p>{t.message}</p>
                        <p>{t.createdAt}</p>
                        {/* <Form action={`/tweeter/${t._id}`}>
                          <Button
                            className="ml-7"
                            variant="primary"
                            type="submit"
                          >
                            Edit
                          </Button>
                        </Form> */}

                        {/* <Form onSubmit={handleDelete.bind(this, t._id)}>
                          <Button
                            className="ml-7"
                            variant="primary"
                            type="submit"
                          >
                            Delete
                          </Button>
                        </Form> */}
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
    </div>
  )
}

export default UserProfile2

