import { render, screen } from "@testing-library/react";
import TextFormField from ".";

describe('TextFormField Tests', () => {

    test('TextFormField should have passed placeholder text through props', () => {

        let placeHolder = "What should be task?"

        render(<TextFormField placeholder={placeHolder} />)
        expect(screen.getByPlaceholderText(placeHolder)).toBeInTheDocument()
    })
})