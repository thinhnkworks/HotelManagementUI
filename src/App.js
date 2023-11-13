import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Invoices from './pages/Invoices';
import ListRooms from './pages/ListRooms';
import Services from './pages/Services';
import Surcharge from './pages/Surcharge';
import Clients from './pages/Clients';
import Sales from './pages/Sales';
import Personnels from './pages/Personnels';
import Login from './pages/authentication/Login.js';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleLogout = () => {
    // Xử lý đăng xuất
    setLoggedIn(false);
  };
  return (
    <>
      <Router>
        {isLoggedIn ? (
          <>
            <Navbar isAdmin={isAdmin} />
            <Header />
            <Switch className="container">
              <Route path='/' exact component={Home} />
              <Route path='/booking' component={Booking} />
              <Route path='/invoices' component={Invoices} />
              <Route path='/listRooms' component={ListRooms} />
              <Route path='/services' component={Services} />
              <Route path='/surcharge' component={Surcharge} />
              <Route path='/clients' component={Clients} />
              <Route path='/sales' component={Sales} />
              <Route path='/personnels' component={Personnels} />
            </Switch>
          </>
        ) : (
          <Login onLogin={(isAdmin) => {
            setLoggedIn(true);
            setIsAdmin(isAdmin);
          }} />
        )}
      </Router>
    </>
  );
}

export default App;
