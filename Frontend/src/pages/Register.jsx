import React, {useState} from 'react';
import './style.css'
import axios from 'axios'

const BASE_URL = "http://localhost:5000/"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            const result = await axios.post(`${BASE_URL}users/register`, {
                name,
                email,
                password
        })
        if(result){
            console.log('User Registered Successfully!')
        }
        setName('')
        setEmail('')
        setPassword('')
        setCpassword('')
    }catch (error){
        console.log(error)
    }
    }

  return (
    <div>
        <h1>Register Page</h1>
        <form onSubmit = {handleRegister} action="">
            <input type="text" value = {name} onChange = {(e) => setName(e.target.value)} placeholder = 'Name'/>
            <input type="email" value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder = 'Email'/>
            <input type="password" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = 'Password'/>
            <input type="password" value = {cpassword} onChange = {(e) => setCpassword(e.target.value)} placeholder = 'Confirm Password'/>
            <input type="submit" value = "Register"/>
        </form>
      
    </div>
  );
}

export default Register;
