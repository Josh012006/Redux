import { Routes, Route } from 'react-router-dom';

import ListTask from "./components/ListTask";
import EditTask from './components/EditTask';
import AddTask from './components/AddTask';



function App() {

  return (
    <div className = "App">
      <Routes>
        <Route path="/" element={<ListTask />} />
        <Route path="/change/:id" element={<EditTask />}/>
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </div>
  )
}

export default App
