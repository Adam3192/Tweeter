import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

const SearchUsers = () => {
  let { searchUsers, getAllUsers } = useContext(UserContext)
  let [users, setUsers] = useState([])
  let [search, setSearch] = useState('')

  useEffect(() => {
    async function getUsers() {
      await getAllUsers().then((response) => {
        setUsers(response)
      })
    }

    getUsers()
  }, [])

  const handleChange = (e) => {
    if (e.target.value === '') return
    e.preventDefault()
    setSearch(e.target.value)
  }

  return (
    <div>
      <h1>Search Users</h1>
      <form>
        <div className="container5">
          <textarea
            className="style1"
            type="text"
            name="message"
            onChange={handleChange}
          />
          <Button type="submit" className="style2 ml-10" variant="info">
            Search
          </Button>
        </div>
      </form>
      {/* {users.filter((index) => {
        if (search == '') {
          return <p>No matching users found</p>
        } else if (
          index.username.toLowerCase().includes(search.toLowerCase())
        ) {
          return (
            <div className="tweet" key={index._id}>
              <div className="container">
                <p className="style3">{index.username}</p>
                <p className="style3">{`${index.firstName} ${index.lastName}`}</p>
                <div>
                  <Link
                    className="gridItem2"
                    to={`/tweeter/user2/${index.username}`}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              <br></br>
            </div>
          )
        }
      })} */}
    </div>
  )
}

export default SearchUsers
