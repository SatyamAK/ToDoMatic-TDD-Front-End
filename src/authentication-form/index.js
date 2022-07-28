import TextFormField from '../components/text-form-field'
import Button from '../components/button'
import './style.css'
import validator from '../utils/validator'
import { useState, useEffect } from 'react'
import urls from '../constants/API'
import User from '../models/user.model'

export default function AuthenticationForm(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formErrors, setFormErrors] = useState({})
    const [resgistrationStatus, setRegistrationStatus] = useState("")
    const [selectedTab, setSelectedTab] = useState("Login")

    let tabNames = ["Login","Register"]

    let tabsUI = tabNames.map((tabName, key) => {
        if(tabName === selectedTab){
            return <div className='tab-active' key={key}>{tabName}</div>
        }
        return <div className='tab' key={key} onClick={()=>setSelectedTab(tabName)}>{tabName}</div>
    })

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
        if(username !== "" && formErrors.password !==""){
            let requestBody = {
                "username": username,
                "password": password
            }
            fetch(urls.LOGIN, {method: 'POST', body: JSON.stringify(requestBody), headers: { 'Content-Type': 'application/json' }})
            .then(async response => {

                const data = await response.json()
                
                if(!response.ok){
                    const error = data
                    return Promise.reject(error)
                }

                let tasks = []
                let user = new User(data.username, tasks)
                props.setUser(user)
                props.setToken(data["access-token"])
                props.setLoggedIn(true)
            }).catch(error => {
                setRegistrationStatus(error.message)
            })
        }
    }

    function registerSubmit(event){
        event.preventDefault()
        setFormErrors(validateForm)

        if(username !== "" && formErrors.password !==""){
            let requestBody = {
                "username": username,
                "password": password
            }

            fetch(urls.REGISTER, {method: 'POST', body: JSON.stringify(requestBody), headers: { 'Content-Type': 'application/json' }})
            .then(async response => {

                const data = await response.json()
                
                if(!response.ok){
                    const error = data
                    return Promise.reject(error)
                }

                setRegistrationStatus(data.message)
            }).catch(error => {
                setRegistrationStatus(error.message)
            })
        }
    }

    return (
        <form className='authentication-form' onSubmit={(selectedTab==="Login")?handleSubmit:registerSubmit}>
            
            {tabsUI}
            <div className='input-fields'>
                <TextFormField name = 'username' placeholder = 'Username' type="text" value={username} onChange = {onChangeLogin} className="text-field" />
                <p>{formErrors.username}</p>
                <TextFormField name = 'password' placeholder = 'Password' type="password" value={password} onChange ={onChangePassword} className="text-field" onClick = {()=> handleSubmit}/>
                <p>{formErrors.password}</p>
            </div>

            <div className='button-container'>
                <Button title={selectedTab} class='primary' onClick = {()=> null} type="submit" />
            </div>
            <p>{resgistrationStatus}</p>
        </form>
    )
}