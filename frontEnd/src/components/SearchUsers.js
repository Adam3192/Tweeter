import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import './SearchUsers.css'

const SearchUsers = () => {
  let { searchUsers, getAllUsers } = useContext(UserContext)
  let [users, setUsers] = useState([])
  let [search, setSearch] = useState('   ')
  let [searchInput, setSearchInput] = useState('   ')
  let [noMatches, setNoMatches] = useState(false)
  let [submitClicked, setSubmitClicked] = useState(false)

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

  function filterSearch() {

  }

  function displayError() {
    return <p>test test test</p>
  }
  
  // ************** Try This**********************************************************************
  // Do a forEach() comparing the username to the search input and then push the matching usernames into an array and then map those array values to my display on the screen. Push them to an array and then map that array because I was getting an error when I was trying to map it the other way. 

  function filter() {
      users.forEach((user) => {
        if(user.username.toLowerCase().includes(searchInput.toLowerCase())) {
               return (
                 <div>
                 <p>no user found</p>
                 <div className="tweet">
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
                 </div>
               )
        } else return <p>test</p>
      })
  }

  function filterAndMap() {
    return(
    users
        .filter((user) => {
          if (user.username.toLowerCase().includes(searchInput.toLowerCase())) {
            return user
          }
          else if (user.lastName.toLowerCase().includes(searchInput.toLowerCase())) {
            return user
          }
          else if (user.firstName.toLowerCase().includes(searchInput.toLowerCase())) {
            return user
          }
          else return displayError()
        })
        .map((user, key) => {
          return (
            <div>
            <p>no user found</p>
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
            </div>
          )
        })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchInput(search)
  }

  return (
    <div className='container6'>
      <h1>Search Users</h1>
      <form onSubmit={handleSubmit}>
        <div className="container5">
          <textarea
            className="style1"
            type="text"
            name="message"
            onChange={handleChange}
          />
          <Button type='submit' className="style2 ml-10" variant="info">
            Search
          </Button>
        </div>
      </form>
      {
        searchInput && filter() 
      }
    </div>
  )
}

export default SearchUsers
