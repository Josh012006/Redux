import PropTypes from 'prop-types';
import image from '../assets/completed.png';

import { deleteTask, markAsCompleted } from '../redux/taskSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';


function Task ({Name, Desc, ID, IsDone}) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    let color = (IsDone)? 'green' : '';

    return (
        <div className="accordion-item" id = {ID} key = {ID}>
            <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {Name}
                    {/* La référence au bouton est utilisée pour entrainer sont clic forcé quand la tâche est complétée
                        Cela permet de la supprimée effectivement de la liste sans avoir  réécrire une fonction séparée pour. */}
                    <img onClick={() => {if(color === '') {dispatch(markAsCompleted(ID))}}} style={{position: 'absolute', right: '100px', width: '16px', height: '16px', backgroundColor: `${color}`, borderRadius: '50%'}} src = {image} alt="completed" />
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body container-fluid">
                    <div className = "row justify-items-around align-items-center">
                        <p className='col-12 col-lg-7' style={{textAlign: 'justify'}}>{Desc}</p>
                        <button type='button' className='btn btn-primary col-12 col-lg-2 my-2 my-lg-0 mx-lg-2' onClick={() => {navigate(`/change/${ID}`)}}>Modifier</button>
                        <button type='button' className='btn btn-primary col-12 col-lg-2 my-2 my-lg-0 mx-lg-2' onClick={() => {dispatch(deleteTask(ID))}}>Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


Task.propTypes = {
    ID: PropTypes.string,
    Name: PropTypes.string,
    Desc: PropTypes.string,
    IsDone: PropTypes.bool
}

export default Task;