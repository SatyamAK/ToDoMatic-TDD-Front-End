import './style.css'
import TaskCard from "../task-item";
import { useState } from 'react';

export default function TaskList(props){

    const [taskIdToBeUpdated, setTaskIdToBeUpdated] = useState(-1)

    function toggleTaskEdit(taskId){
        setTaskIdToBeUpdated(taskId)
    }

    const taskList = props.taskList.map(task => 
        <TaskCard 
            task={task} 
            key={task.id} 
            toggleTaskDoneOrNot = {props.toggleTaskDoneOrNot}
            delTask = {props.delTask}
            taskIdToBeUpdated = { taskIdToBeUpdated }
            toggleTaskEdit = {toggleTaskEdit}
            editATask = {props.editATask}/>
    )
    
    return (
        <div className="task-list">
            { taskList }
        </div>
    );
}