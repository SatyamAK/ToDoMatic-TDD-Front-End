import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextFormField from ".";

describe('TextFormField Tests', () => {

    let onChange = jest.fn()

    test('TextFormField should have passed placeholder text through props', () => {

        let placeHolder = "What should be task?"

        render(<TextFormField placeholder={placeHolder} value="" onChange = {onChange}/>)
        expect(screen.getByPlaceholderText(placeHolder)).toBeInTheDocument()
    })

    test('TextFormField should have type passed through props', () => {

        let type = "password"

        render(<TextFormField placeholder={'placeHolder'} type = {type} value="" onChange = {onChange}/>)
        expect(screen.getByPlaceholderText('placeHolder')).toHaveAttribute("type", type)
    })

    test('TextFormField should have value passed through props', () => {

        let value = "user"

        render(<TextFormField placeholder={'placeHolder'} value = {value} onChange = {onChange}/>)
        expect(screen.getByPlaceholderText('placeHolder')).toHaveAttribute("value", value)
    })

    test('Onchange function should call fuction passed through props', ()=>{

        render(<TextFormField placeholder={'placeHolder'} value = {'value'} onChange = {onChange}/>)
        userEvent.type(screen.getByPlaceholderText('placeHolder'), "abc")
        expect(onChange).toBeCalled()
    })
})