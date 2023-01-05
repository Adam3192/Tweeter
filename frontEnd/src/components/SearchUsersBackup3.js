import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import './SearchUsers.css'

const SearchUsersBackup2 = () => {
  let { searchUsers, getAllUsers } = useContext(UserContext)
  let [users, setUsers] = useState([])
  let [search, setSearch] = useState('   ')

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
    <div className='container6'>
      <h1>Search Users</h1>
      <form>
        <div className="container5">
          <textarea
            className="style1"
            type="text"
            name="message"
            onChange={handleChange}
          />
          <Button className="style2 ml-10" variant="info">
            Search
          </Button>
        </div>
      </form>
      {users
        .filter((user) => {
          if (search == null) return (<p>No matching users found</p>);
          else if (user.username.toLowerCase().includes(search.toLowerCase())) {
            return user
          }
          else if (user.lastName.toLowerCase().includes(search.toLowerCase())) {
            return user
          }
          else if (user.firstName.toLowerCase().includes(search.toLowerCase())) {
            return user
          }
        })
        .map((user, key) => {
          return (
            <div className="tweet" key={key}>
              <div className="container">
                <p className="style3">{user.username}</p>
                <p className="style3">{`${user.firstName} ${user.lastName}`}</p>
                <div>
                  <Link
                    className="gridItem2"
                    to={`/tweeter/user2/${user.username}`}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              <br></br>
            </div>
          )
        })}
    </div>
  )
}

export default SearchUsersBackup2
