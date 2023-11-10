import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Main } from './components/Main';
import { Trading } from './components/Trading';
// import Axios from 'axios'

function App() {

  // <Signup/>
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={
            <Main />
          } />

          <Route path="/signup" element={
            <Signup />
          } />

          <Route path="/trading" element={
            <Trading />
          } />

        </Routes>
      </Router>
    </div>
  );

}

export default App;
