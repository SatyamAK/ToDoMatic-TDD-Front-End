import TextFormField from '../components/text-form-field'
import Button from '../components/button'
import './style.css'
import validator from '../utils/validator'
import { useState, useEffect } from 'react'

export default function AuthenticationForm(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    function onChangeLogin(event){
        setUsername(event.target.value)
    }

    function onChangePassword(event){
        setPassword(event.target.value)
    }

    const validateForm = () => {
        const error = {}

        if(!validator(username)){
            error.username = "Username cannot be empty"
        }

        if(!validator(password)){
            error.password = "Password cannot be empty"
        }

        return error
    }

    useEffect(()=>{
        
    }, [formErrors])

    function handleSubmit(event){
        event.preventDefault()
        setFormErrors(validateForm)
    }

    function registerSubmit(event){
        event.preventDefault()
        setFormErrors(validateForm)
    }

    return (
        <form className='authentication-form' onSubmit={handleSubmit}>
            <h3>If you are new user please use register button</h3>

            <div className='input-fields'>
                <TextFormField name = 'username' placeholder = 'Username' type="text" value={username} onChange = {onChangeLogin} className="text-field" />
                <p>{formErrors.username}</p>
                <TextFormField name = 'password' placeholder = 'Password' type="password" value={password} onChange ={onChangePassword} className="text-field" onClick = {()=> handleSubmit}/>
                <p>{formErrors.password}</p>
            </div>

            <div className='button-container'>
                <Button title='Login' class='primary' onClick = {()=> handleSubmit} type="null"/>
                <Button title='Register' class='secondary' onClick = {()=> registerSubmit} type="null"/>
            </div>
        </form>
    )
}