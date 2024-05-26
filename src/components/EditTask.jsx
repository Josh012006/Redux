import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { editTask } from "../redux/taskSlice";


function EditTask () {

    // Je récupère la valeur de l'id : il est soit undefined ou un nombre
    const ID = useParams().id;

    // J'importe le tableau des tâches et je repère la tâche à changer
    const tasks = (useSelector(state => state.tasks)).all;
    const concerned = tasks.find(j => j.id === ID);
    console.log(concerned.name);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Ces états permettent de contrôler les inputs
    const [editName, setEditName] = useState('');
    const [editDesc, setEditDesc] = useState('');

     // Utilisation de useEffect pour mettre à jour les états une fois que 'concerned' est défini
    useEffect(() => {
        if (concerned) {
            setEditName(concerned.name);
            setEditDesc(concerned.desc);
            console.log('done');
        }
    }, [concerned]);

    // Permet de gérer l'erreur où un des champs est vide à la soumission
    const [editError, setEditError] = useState("");


    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Je vérifie qu'aucun des champs n'est vide. Si oui je continue. Sinon je montre l'erreur
        if(editName !== "" && editDesc !== "") {
            // J'ajoute la tâche
            dispatch(editTask({id: concerned.id, name: editName, desc: editDesc, isDone: concerned.isDone}));

            // Je ramène l'utilisateur vers la page d'accueil pour voir l'ensemble de ses tâches
            navigate('/');
        }
        else {
            setEditError("Veuillez remplir tous les champs");
        }
    }

    return(
        <div>
            {editError != "" && <div className="my-4 bg-danger p-3 rounded-1" style={{width: '400px', margin:'auto', marginTop: '100px'}}>{editError}</div>}
            {concerned && <form  onSubmit = {handleSubmit} id = "taskForm" className="d-flex flex-column justify-content-around align-items-center" style={{width: '400px', margin:'auto', marginTop: '100px'}}>
                <label htmlFor="nom" className="mt-2">Task name</label>
                <input className="rounded-1 px-3" style = {{width: '100%', height: '40px'}} id = "nom" type = "text" value={editName} onChange={(e) => {setEditName(e.target.value); setEditError("");}} />
                <label htmlFor="desc" className="mt-2">Description</label>
                <textarea className="rounded-1 px-3" style = {{width: '100%', minHeight: '150px'}} id = "desc" value = {editDesc} onChange  = {(e) => {setEditDesc(e.target.value); setEditError("");}}></textarea>
                <button type='submit' className="btn btn-primary my-2" form="taskForm">Modifier</button>
            </form>}
        </div>
    )
}


export default EditTask;