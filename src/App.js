import React from 'react';
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





function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Header />
        <Switch classname="container">
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
      </Router>
    </>
  );
}

export default App;