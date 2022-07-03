import './App.css';
import React from "react";
import GetListings from "./components/getListings.js";
import SubmissionPage from './newPosting';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className ="d-flex justify-content-between">
        <h1 className = "ml-5 font-weight-bold">Listing Site</h1>
        <div>
          <Link to="/create" className="btn btn-primary text-right">Create</Link>
          <Link to="/" className="btn text-right">Listings</Link>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/create' element={<SubmissionPage/>}/>
      </Routes>
    </Router>
  );
}

function MainPage() {
  return (<div>
    <GetListings/>
  </div>);
}
export default App;
