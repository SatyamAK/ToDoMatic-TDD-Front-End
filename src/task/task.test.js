import { AppContext } from '../contexts/app.context'
import TaskView from '.'
import User from '../models/user.model'
import Task from '../models/task.model'

const { render, screen } = require("@testing-library/react")

describe('Testing Task View', ()=>{

    var state
    var user
    var taskList = [new Task('testing', false, 1)]

    beforeAll(()=>{
        user = new User('test', taskList)
        state = {
            'user': user,
            'loggedIn': true
        }
    })

    test('Testing if welcome user is rendered', ()=>{

        render(
            <AppContext.Provider value={state}>
                <TaskView />
            </AppContext.Provider>
        )
        expect(screen.getByText("Welcome "+user.username)).toBeInTheDocument()
    })

    test('Testing if textformfield is rendered', ()=>{

        render(
            <AppContext.Provider value={state}>
                <TaskView />
            </AppContext.Provider>
        )
        expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument()
    })

    test('Testing if tabs is rendered', ()=>{

        render(
            <AppContext.Provider value={state}>
                <TaskView />
            </AppContext.Provider>
        )
        expect(screen.getByText("All")).toBeInTheDocument()
        expect(screen.getByText("Active")).toBeInTheDocument()
        expect(screen.getByText("Completed")).toBeInTheDocument()
    })

    test('Testing if tasks is rendered', ()=>{

        render(
            <AppContext.Provider value={state}>
                <TaskView />
            </AppContext.Provider>
        )
        expect(screen.getByText(taskList[0].title)).toBeInTheDocument()
    })
})