import React from 'react';
import HostingComponent from '../src/testing'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import User from './user/User'

function App() {
  return (<div>
          <Navbar/>
    <HostingComponent />
    <User /></div>
  )
  

export default App;
