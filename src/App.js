import React, { useState } from 'react';
import './App.css';
import Header from './Components/Layout/Header';
import Search from './Components/Layout/Search';

function App() {

  const initJobs = []
  const [jobs, setJobs,osoite] = useState(initJobs);

  fetch('https://gis.vantaa.fi/rest/tyopaikat/v1/kaikki')
  .then(response => response.json())
  .then(json=>setJobs([...json]));

  const rows = () => jobs.map(job => {
    return <p><input type='checkbox'></input>{job.tyotehtava},{job.osoite}, <a href={job.linkki}> Lisätietoa </a> </p>})
 
    return (
    <div className="App">
      <Header />
      <Search />
      {rows()}
    </div>
  );
}

export default App;
