import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button";

describe('Button', ()=>{

    test('Button renders correctly with passed title', ()=>{

        let title = "Test Title"
        render(<Button title={title} />)
        expect(screen.getByText(title)).toBeInTheDocument()
    })

    test('Button executes the function passed to it when clicked', ()=>{

        var title = "Hello"
        var mockFunction = jest.fn();

        render(<Button title={title} onClick = {() => mockFunction()} />)
        userEvent.click(screen.getByText(title))
        expect(mockFunction.mock.calls.length).toBeGreaterThanOrEqual(1)
    })

    test('Button is of type passed through props', () =>{

        render(<Button title='hi' onClick = {() => null} type = "submit" />)
        expect(screen.getByText('hi')).toHaveAttribute("type", "submit")
    })

    test('Button should have class passed through props', ()=>{

        render(<Button title='hi' onClick ={() => null} type = {null} class = "primary" />)
        expect(screen.getByText('hi')).toHaveAttribute("class", "primary")
    })

})