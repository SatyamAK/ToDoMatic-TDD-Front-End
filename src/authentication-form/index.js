import TextFormField from '../components/text-form-field'
import Button from '../components/button'
import './style.css'
import { useState } from 'react'

export default function AuthenticationForm(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function onChangeLogin(event){
        setUsername(event.target.value)
    }

    function onChangePassword(event){
        setPassword(event.target.value)
    }

    return (
        <form className='authentication-form'>
            <h1>If you are new user please use register button</h1>

            <div className='input-fields'>
                <TextFormField placeholder = 'Username' type="text" value={username} onChange = {onChangeLogin} className="text-field"/>
                <TextFormField placeholder = 'Password' type="text" value={password} onChange ={onChangePassword} className="text-field"/>
            </div>

            <div className='button-container'>
                <Button title='Login' class='primary'/>
                <Button title='Register' class='secondary'/>
            </div>
        </form>
    )
}