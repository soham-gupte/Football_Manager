import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { Marketplace } from './components/Marketplace';
import { Menu } from './components/Menu';
import { Trading } from './components/Trading';
import { Transaction } from './components/Transaction';
import { Notifications } from './components/Notifications';
// import Axios from 'axios'

function App() {

  // <Signup/>
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={
            <Home />
          } />

          <Route path="/signup" element={
            <Signup />
          } />

          <Route path="/login" element={
            <Login />
          } />

          <Route path="/main" element={
            <Main />
          } />

          <Route path="/marketplace" element={
            <Marketplace itemsPerPage={20} />
          } />

          <Route path="/trading" element={
            <Trading />
          } />

          <Route path="/transaction" element={
            <Transaction />
          } />

          <Route path="/notifications" element={
            <Notifications />
          } />

        </Routes>
      </Router>
    </div>
  );

}

export default App;
