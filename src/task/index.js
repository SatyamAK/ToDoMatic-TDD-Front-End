import './style.css'
import TextFormField from "../components/text-form-field";
import Button from "../components/button";
import TaskList from "./task-list";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/app.context';
import urls from '../constants/API';
import Task from '../models/task.model';

export default function TaskView(){
    
    const state = useContext(AppContext)
    const [name, setName] = useState("")
    const [selectedTab, setSelectedTab] = useState("All")

    let tabNames = [ "All", "Active", "Completed" ]

    let tabsUI = tabNames.map((tabName, key) => {
        if(tabName === selectedTab){
            return <div className='tab-active' key={key}>{tabName}</div>
        }
        return <div className='tab' key={key} onClick={()=>setSelectedTab(tabName)}>{tabName}</div>
    })

    function handleSubmit(event){

        if(name===""){
            event.preventDefault()
            return
        }

        event.preventDefault()
        setName("")
    }

    function handleChange(event){
        setName(event.target.value)
    }

    useEffect(()=>{
        fetch(urls.GETALLTASKS+'?username='+state.user.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ state.token
            }
        }).then(async response => {

            let tasks = []
            let data = await response.json()

            if(!response.ok){
                const error = data
                return Promise.reject(error)
            }
            data.tasks.map((task)=>{
                tasks.push(new Task(task.title, task.done, task.id))
            })

            state.setTasks(tasks)
        }).catch(err => {
            console.log(err)
        })
    })

    let taskList = state.tasks
    return (
        <div className='task-view'>
            <h3>Welcome {state.user.username}</h3>
            <form className="task-form" onSubmit={handleSubmit}>
                <TextFormField type="text"placeholder="What needs to be done?" value={name} onChange={handleChange}/>
                <Button title="Add" type="submit" onClick = {null} class="primary" />
            </form>
            <div className='tabs'>{ tabsUI } </div>
            <TaskList taskList = {taskList} />
        </div>
    );
}