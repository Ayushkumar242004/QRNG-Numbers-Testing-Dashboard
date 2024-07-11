import React from 'react';
import Home from './Components/Home';
import ServerTesting from './Components/ServerTesting/ServerTesting';
import {Signup} from './Components/Signup';
import {Signin} from './Components/Signin';
import axios from 'axios'
import { Route, Routes } from "react-router-dom";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Server_testing" element={<ServerTesting />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;