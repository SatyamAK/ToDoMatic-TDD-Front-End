import './style.css'
import TextFormField from "../components/text-form-field";
import Button from "../components/button";
import TaskList from "./task-list";
import { useContext, useState } from 'react';
import { AppContext } from '../contexts/app.context';

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

    let taskList = state.user.tasks
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