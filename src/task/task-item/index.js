import './style.css';
import Button from '../../components/button'
import TextFormField from '../../components/text-form-field';
import { useState } from 'react';

export default function TaskItem(props){

    const [taskName, setTaskName] = useState("")

    const editContainer = (
        <form className='edit-container' onSubmit= {handleSubmit}>
            <TextFormField 
                type="text"
                placeholder={"What will be the new name of "+props.task.title}
                value={taskName} 
                onChange={changeHandler}
            />
            <Button title="Save" type = "submit" onClick={handleSubmit} class="secondary"/>
            <Button title="Cancel" onClick={()=> setEditing(-1)} class="accent"/>
        </form>
    );

    const buttonsContainer = (
        <div className='buttons-container'>
            <Button title="Edit" type = "button" onClick = {() => setEditing(props.task.id)} class="secondary"/>
            <Button title="Delete" onClick={()=> props.delTask(props.task.id)} class="accent"/>
        </div>
    );

    function onChange(taskId){
        props.toggleTaskDoneOrNot(taskId)
    }

    function setEditing(taskId){
        props.toggleTaskEdit(taskId)
    }

    function changeHandler(event){
        setTaskName(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();

        if(taskName === "") return

        props.editATask(props.taskIdToBeUpdated, taskName)
        setTaskName("")
        setEditing(-1)
    }

    return(
        <div className='task-card'>
            <div className='task-status'>
                <input type="checkbox" checked={props.task.done} onChange={() => onChange(props.task.id)}></input>
                <div className='task-name'>{props.task.title}</div>
            </div>
            { (props.taskIdToBeUpdated === props.task.id)?editContainer:buttonsContainer }
        </div>
    );
}