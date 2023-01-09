import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import './SignUp.css'

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createUser(username, password, firstName, lastName, city, state).then(() => {
            navigate('/signin');
        }).catch(error => {
            console.log(error);
            window.alert('Failed registration: error creating user');
        });
    }

    return (
        <form className='margin2' onSubmit={handleSubmit}>
            <h1>REGISTER</h1>
            <br></br><br></br>
            <span className='pad1'>Username  </span>
            <input placeholder="Enter Email" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            <br></br><br></br>
            <span className='pad2'>Password  </span>
            <input placeholder="Enter Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <br /><br></br>
            <span className='pad3'>First Name  </span>
            <input placeholder="Enter First Name" type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <br /><br></br>
            <span className='pad4'>Last Name  </span>
            <input placeholder="Enter Last Name" type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
            <br /><br></br>
            <span className='pad5'>City  </span>
            <input placeholder="Enter City" type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
            <br /><br></br>
            <span className='pad6'>State  </span>
            <input placeholder="Enter State" type="text" name="state" value={state} onChange={e => setState(e.target.value)} />
            <br /><br></br>
            <button className='style1'>Sign Up</button>
        </form>
    )
};

export default SignUp;