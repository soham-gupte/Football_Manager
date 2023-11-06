import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Dashboard } from './components/main';
// import Axios from 'axios'

function App() {
  
  // <Signup/>
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={
            <Home/>
          } />

          <Route path="/signup" element={
            <Signup/>
          } />

          <Route path="/login" element={
            <Login/>
          } />

          <Route path="/dashboard" element={
            <Dashboard/>
          } />

        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
