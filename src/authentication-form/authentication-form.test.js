import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthenticationForm from ".";

describe('Authentication Form test', ()=> {

    test('Testing if tabs is rendered', ()=>{

        render(<AuthenticationForm />)
        expect(screen.getAllByText("Login")).toBeTruthy()
        expect(screen.getByText("Register")).toBeInTheDocument()
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

    test('Login/Register button should be there', ()=>{

        render(<AuthenticationForm />)
        expect(screen.getByRole('button')).toBeInTheDocument()
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

    test('Login or Registration without username and password gives error or not', ()=>{
        render(<AuthenticationForm />)
        userEvent.click(screen.getByRole('button'))
        expect(screen.getByText('Username cannot be empty')).toBeInTheDocument()
        expect(screen.getByText('Password cannot be empty')).toBeInTheDocument()
    })

})