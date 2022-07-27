import { render, screen } from "@testing-library/react"
import TaskList from "."
import Task from "../../models/task.model.js"

describe('Testing of Task-List', ()=>{

    test('testing if task-list has list of task\'s details passed through props', ()=>{
        
        let tasks = [ new Task('Testing', false, 1), new Task('Refactoring', false, 2) ]

        render(<TaskList taskList = {tasks} />)
        expect(screen.getByText(tasks[0].title)).toBeInTheDocument()
        expect(screen.getByText(tasks[1].title)).toBeInTheDocument()
    })
})