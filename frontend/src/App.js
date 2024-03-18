import './App.css';
import Login from "./Components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from "./Components/Register";
import Home from './Components/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;
