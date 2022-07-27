import { render, screen } from "@testing-library/react"
import TaskItem from "."
import Task from "../../models/task.model.js"

describe('Testing of Task-Item', ()=>{

    test('testing if task-item has task\'s details passed through props', ()=>{
        
        let task = new Task('Testing', false, 1)

        render(<TaskItem task = {task} />)
        expect(screen.getByText(task.title)).toBeInTheDocument()
    })

    test('Testing if Selected task is in Edit mode', () =>{

        let task = new Task('Testing', false, 1)

        render(<TaskItem task = {task} taskIdToBeUpdated={task.id}/>)
        expect(screen.getByText('Save')).toBeInTheDocument()
    })

    test('Testing if non Selected task is in View mode', () =>{

        let task = new Task('Testing', false, 1)

        render(<TaskItem task = {task} taskIdToBeUpdated={task.id+1}/>)
        expect(screen.getByText('Edit')).toBeInTheDocument()
    })
})