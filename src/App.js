import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/home';
import Edit from './components/edit';
function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
    </Router>

    </div>
  );
}

export default App;
