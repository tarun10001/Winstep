import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Car from './components/Car';

function App() {
 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car" element={<Car />} />

      </Routes>
         
    </div>
  )
}

export default App