import React from 'react';
import { Route,Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ContactInformation from './ContactInformation';
import AddUserForm from './AddUserForm';


const Routing = () =>{
  return (
    <>
      <Routes>
        <Route exact path='/' Component={HomePage}/>
        <Route path='/contactInformation' Component={ContactInformation}/>
        <Route path='/addUser' Component={AddUserForm}/>
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <>
      <Routing/>
    </>
  )
}

export default App
