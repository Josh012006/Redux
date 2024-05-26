import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import Task from './Task';




function ListTask () {

    const [filter, setFilter] = useState("All");

    const navigate = useNavigate();

    const fetched = useSelector(state => state.tasks);
    const tasksTab = (filter === "All") ? fetched.all : (filter === "Done") ? fetched.done : fetched.notDone;


    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-primary my-4" type="button" onClick={() => {navigate('/add')}}>Ajouter une tâche</button>
            <select value={filter} onChange={(e) => {setFilter(e.target.value)}} className="my-5 rounded-1" style = {{width: '150px'}}>
                <option>All</option>
                <option>Done</option>
                <option>Not Done</option>
            </select>
            {/* Le tableau est parcouru et s'il est rempli et contient plus de deux éléments, on le parcoure pour former une liste d'élément Task */}
            {tasksTab && <div className="accordion" id="accordionExample" style = {{width: '85%'}}>
                {tasksTab.map((j) => {return <Task key = {j.id} ID = {j.id} Name = {j.name} Desc = {j.desc} IsDone = {j.isDone} />})}
            </div>}
        </div>
    )
}


export default ListTask;