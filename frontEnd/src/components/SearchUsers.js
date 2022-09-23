import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams, Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

const SearchUsers = () => {
  let navigate = useNavigate()
  let { searchUsers } = useContext(UserContext)
  let [users, setUsers] = useState([])
  let [search, setSearch] = useState('')
  let params = useParams()

  useEffect(() => {
   async function getUser() {
     await searchUsers(search).then((response) => {
       setUsers(response)
     })
   }

   getUser()
 }, [search])

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
          <Button type='submit' className="style2 ml-10"  variant="info">Search</Button>
        </div>
      </form>
      {users.map((u) => {
                return (
                  <div className="tweet" key={u._id}>
                    <div className="container">
                      <p className="style3">{u.username}</p>
                      <p className="style3">{`${u.firstName} ${u.lastName}`}</p>
                      <div>
                        <Link className='gridItem2' to={`/tweeter/user2/${u.username}`}>View Profile</Link>
                      </div>
                    </div>
                    <br></br>
                  </div>
                )
              })}
    </div>
  )
}

export default SearchUsers
