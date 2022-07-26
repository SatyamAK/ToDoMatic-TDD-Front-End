import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthenticationForm from ".";

describe('Authentication Form test', ()=> {

    test('Intro text informing about login button and register button', ()=> {

        render(<AuthenticationForm />)
        expect(screen.getByText("If you are new user please use register button")).toBeInTheDocument()
    })

    test('User text field should have placeholder of username', () => {

        let placeholder = 'Username'

        render(<AuthenticationForm />)
        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    })

    test('User text field should have placeholder of password', () => {

        let placeholder = 'Password'

        render(<AuthenticationForm />)
        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    })

    test('Login button should be there', ()=>{
        
        let title = 'Login'

        render(<AuthenticationForm />)
        expect(screen.getByText(title)).toBeInTheDocument()
    })

    test('Register button should be there', ()=>{
        
        let title = 'Register'

        render(<AuthenticationForm />)
        expect(screen.getByText(title)).toBeInTheDocument()
    })

    test('Typing in Username should be reflected', ()=> {

        render(<AuthenticationForm />)
        userEvent.type(screen.getByPlaceholderText('Username'), 'hello')
        expect(screen.getByPlaceholderText('Username')).toHaveValue('hello')
    })
    
    test('Typing in Password should be reflected', ()=> {

        render(<AuthenticationForm />)
        userEvent.type(screen.getByPlaceholderText('Password'), 'hello')
        expect(screen.getByPlaceholderText('Password')).toHaveValue('hello')
    })
})