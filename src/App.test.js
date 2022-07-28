import { render, screen } from '@testing-library/react';
import App from './App';
import { Wrapper } from './App';
import { AppContext } from './contexts/app.context';

describe("App testing when user is not logged in", ()=>{

  test('renders heading todomatic', () => {
    render(<App />);
    const linkElement = screen.getByText('ToDoMatic');
    expect(linkElement).toBeInTheDocument();
  });
  
  test('renders auth form when user is not logged in', ()=> {

    render(
      <AppContext.Provider value = {false}>
        <Wrapper />
      </AppContext.Provider>
    )

    expect(screen.getAllByText("Login")).toBeTruthy()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })
})