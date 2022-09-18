import React, { useContext, useEffect, useState } from 'react'
import TweetContext from '../contexts/TweetContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './TweetList.css'
import UserContext from '../contexts/UserContext'

const TweetList = () => {
  let loggedIn = localStorage.getItem('myTweetToken')
  let { deleteTweet } = useContext(TweetContext)
  let navigate = useNavigate()
  let [user2, setUser2] = useState({})
  let { getCurrentUser2 } = useContext(UserContext)
  
  useEffect(() => {
    async function fetch() {
      await getCurrentUser2().then((response) => {
        console.log(`current user is ${response}`)
        setUser2(response)
      })
    }

    fetch()
  }, [loggedIn])

  function handleDelete(id) {
    deleteTweet(id).catch((error) => {
      console.log(error)
      navigate('/signin')
    })
    navigate('/tweeter')
  }

  return (
    <TweetContext.Consumer>
      {({ tweet }) => {
        return (
          <div className="container2">
            <div className="container3">
              <h1>Tweet Feed</h1>
              {loggedIn ? <Link to="/tweeter/new">Add New Tweet</Link> : ''}
              {/* <Link to="/tweeter/new">Add New Tweet</Link> */}
              <br></br>
              <br></br>
              <br></br>
              {console.log(tweet)}
            </div>
            <div>
              {tweet.map((t) => {
                return (
                  <div className="tweet" key={t.id}>
                    <div className="container">
                      <h2 className="gridItem1">{t.message}</h2>
                      <div>
                        <Link className='gridItem2' to={`/tweeter/user2/${t.name}`}>{t.name}</Link>
                        <p className="gridItem3">{t.createdAt}</p>
                      </div>
                    </div>
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

export default TweetList
