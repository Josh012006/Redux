import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    all: [],
    done: [],
    notDone: []
};


const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            return {
                all: [...state.all, action.payload],
                done: [],
                notDone: [...state.notDone, action.payload]
            };
        },
        editTask: (state, action) => {
            let newAll = state.all.filter(j => j.id !== action.payload.id);
            let newDone = state.done.filter(j => j.id !== action.payload.id);
            let newNotDone = state.notDone.filter(j => j.id !== action.payload.id);
            return {
                all: [...newAll, action.payload],
                done: [...newDone, action.payload],
                notDone: [...newNotDone, action.payload]
            }
        },
        markAsCompleted: (state, action) => {
            // Mettre à jour la tâche dans 'all'
            state.all.forEach(j => {
                if (j.id === action.payload) {
                    j.isDone = true;
                }
            });

            // Filtrer 'notDone' pour supprimer la tâche complétée
            state.notDone = state.notDone.filter(j => j.id !== action.payload);

            // Trouver la tâche concernée et l'ajouter à 'done'
            const concernedTask = state.all.find(j => j.id === action.payload);
            if (concernedTask) {
                state.done.push(concernedTask);
            }
        },
        deleteTask: (state, action) => {
            let newAll = state.all.filter(j => j.id !== action.payload);
            let newDone = state.done.filter(j => j.id !== action.payload);
            let newNotDone = state.notDone.filter(j => j.id !== action.payload);

            return {
                all: newAll,
                done: newDone,
                notDone: newNotDone
            }
        }
    }
});


export const {addTask, editTask, markAsCompleted, deleteTask} = taskSlice.actions;

export default taskSlice.reducer;