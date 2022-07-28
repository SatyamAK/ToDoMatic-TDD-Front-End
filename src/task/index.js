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
        return <div className='tab' key={key} onClick={()=>filterTasks(tabName)}>{tabName}</div>
    })

    function setEveryTasks(tasks){
        state.setAllTasks(tasks)
        state.setTasks(tasks)
        setSelectedTab("All")
    }

    function handleSubmit(event){

        if(name===""){
            event.preventDefault()
            return
        }
        event.preventDefault()

        let newTask ={
            "title": name,
            "done": false
        }

        fetch(urls.ADDTASK+'?username='+state.user.username, {
            mode: 'cors',
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ state.token
            },
            body: JSON.stringify(newTask)
        }).then(async response => {

            
            let data = await response.json()

            if(!response.ok){
                const error = data
                return Promise.reject(error)
            }

            let updatedTasks = []
            data.updated_tasks.map(task=>{
                updatedTasks.push(new Task(task.title, task.done, task.id))
            })

            setEveryTasks(updatedTasks)
        }).catch(err => {
            console.log(err)
        })

        setName("")
    }

    function handleChange(event){
        setName(event.target.value)
    }

    function editATaskName(id, name){
        let newTask ={
            "id": id,
            "title": name,
            "done": state.tasks[id-1].done
        }

        fetch(urls.EDITTASK+'?username='+state.user.username, {
            mode: 'cors',
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ state.token
            },
            body: JSON.stringify(newTask)
        }).then(async response => {

            
            let data = await response.json()

            if(!response.ok){
                const error = data
                return Promise.reject(error)
            }

            let updatedTasks = []
            data.updated_tasks.map(task=>{
                updatedTasks.push(new Task(task.title, task.done, task.id))
            })

            setEveryTasks(updatedTasks)
        }).catch(err => {
            console.log(err)
        })
    }

    function toggleTaskDoneOrNot(id){
        let status = !state.tasks[id-1].done

        let newTask ={
            "id": id,
            "title": state.tasks[id-1].title,
            "done": status
        }

        fetch(urls.EDITTASK+'?username='+state.user.username, {
            mode: 'cors',
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ state.token
            },
            body: JSON.stringify(newTask)
        }).then(async response => {

            
            let data = await response.json()

            if(!response.ok){
                const error = data
                return Promise.reject(error)
            }

            let updatedTasks = []
            data.updated_tasks.map(task=>{
                updatedTasks.push(new Task(task.title, task.done, task.id))
            })

            setEveryTasks(updatedTasks)
        }).catch(err => {
            console.log(err)
        })
    }

    function deleteTask(id){
    
        fetch(urls.DELETETASK+'?username='+state.user.username+'&taskId='+id, {
            mode: 'cors',
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ state.token
            }
        }).then(async response => {

            
            let data = await response.json()

            if(!response.ok){
                const error = data
                return Promise.reject(error)
            }

            let updatedTasks = []
            data.updated_tasks.map(task=>{
                updatedTasks.push(new Task(task.title, task.done, task.id))
            })

            setEveryTasks(updatedTasks)
        }).catch(err => {
            console.log(err)
        })
    }

    function filterTasks(tabname){

        setSelectedTab(tabname)
        if(tabname === "Active"){
            let filteredTasks = state.allTasks.filter((task) => !task.done)
            state.setTasks(filteredTasks)
        }

        if(tabname === "Completed"){
            let filteredTasks = state.allTasks.filter((task) => task.done)
            state.setTasks(filteredTasks)
        }

        if(tabname === "All"){
            state.setTasks(state.allTasks)
        }
    }

    useEffect(()=>{
        fetch(urls.GETALLTASKS+'?username='+state.user.username, {
            mode: 'cors',
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
            data.tasks.map(task=>{
                tasks.push(new Task(task.title, task.done, task.id))
            })

            setEveryTasks(tasks)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    let taskList = state.tasks
    return (
        <div className='task-view'>
            <h3>Welcome {state.user.username}</h3>
            <form className="task-form" onSubmit={handleSubmit}>
                <TextFormField type="text" placeholder="What needs to be done?" value={name} onChange={handleChange}/>
                <Button title="Add" type="submit" onClick = {null} class="primary" />
            </form>
            <div className='tabs'>{ tabsUI } </div>
            <TaskList taskList = {taskList} editATask = {editATaskName} toggleTaskDoneOrNot = {toggleTaskDoneOrNot}
                delTask = {deleteTask}/>
        </div>
    );
}