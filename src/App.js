import React, { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route,useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const [isToken, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin');

    if (token && adminStatus) {
      setToken(true);
      setIsAdmin(adminStatus === 'true');
    }
  }, []);
  console.log(isToken)
  return (
    <>
      <Router>
        {isToken ? (
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
          <Login
          onLogin={(isAdmin) => {
            setIsAdmin(isAdmin);
            setToken(true);
            // Store authentication information in localStorage
            localStorage.setItem('isAdmin', isAdmin.toString());
            history.push('/');
          }}
        />
        )}
      </Router>
    </>
  );
}

export default App;
