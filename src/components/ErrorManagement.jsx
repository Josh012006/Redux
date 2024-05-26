import { useNavigate } from "react-router";


function ErrorManagement() {
    const navigate = useNavigate();

    return (
        <div>
            <h1 style= {{textAlign: 'center', marginTop: '100px'}}>Une erreur s&apos;est produite</h1>
            <button type = "button" className="btn btn-primary" onClick = {navigate("/")}>Retourner à la liste de tâches.</button>
        </div>
    )
}

export default ErrorManagement;