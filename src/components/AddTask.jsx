import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';
import { addTask } from "../redux/taskSlice";



function AddTask() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Ces états permettent de contrôller les inputs
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    // Permet de gérer l'erreur où un des champs est vide à la soumission
    const [error, setError] = useState("");


    // Génération d'un id unique pour la tache
    const taskId = uuidv4();

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Je vérifie qu'aucun des champs n'est vide. Si oui je continue. Sinon je montre l'erreur
        if(name != "" && desc != "") {
            // J'ajoute la tâche
            dispatch(addTask({id: taskId, name, desc, isDone: false}));

            // Je ramène l'utilisateur vers la page d'accueil pour voir l'ensemble de ses tâches
            navigate('/');
        }
        else {
            setError("Veuillez remplir tous les champs");
        }
    }

    return (
        <div>
            {error != "" && <div className="my-4 bg-danger p-3 rounded-1" style={{width: '400px', margin:'auto', marginTop: '100px'}}>{error}</div>}
            <form  onSubmit = {handleSubmit} id = "taskForm" className="d-flex flex-column justify-content-around align-items-center" style={{width: '400px', margin:'auto', marginTop: '100px'}}>
                <label htmlFor="nom" className="mt-2">Task name</label>
                <input className="rounded-1 px-3" style = {{width: '100%', height: '40px'}} id = "nom" type = "text" value={name} onChange={(e) => {setName(e.target.value); setError("");}} />
                <label htmlFor="desc" className="mt-2">Description</label>
                <textarea className="rounded-1 px-3" style = {{width: '100%', minHeight: '150px'}} id = "desc" value = {desc} onChange  = {(e) => {setDesc(e.target.value); setError("");}}></textarea>
                <button type='submit' className="btn btn-primary my-2" form="taskForm">Ajouter</button>
            </form>
        </div>
    )
}



export default AddTask;