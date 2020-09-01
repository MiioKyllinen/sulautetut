import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Layout/Header';
import Search from './Components/Layout/Search';
import Jobs from './Components/Jobs';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import About from './Components/Weather';

function App() {

  const initJobs = []
  const [jobs, setJobs] = useState(initJobs);

  const [filterText, setFilterText] = useState('');
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    fetch('http://gis.vantaa.fi/rest/tyopaikat/v1/kaikki')
      .then(response => response.json())
      .then(json => setJobs([...json]));
  }, []);

  const handleComplete = (job) => {
    const findCompleted = jobs.map((checkJob) => {
      if (checkJob.id === job.id) {
        checkJob.completed = !checkJob.completed;

      }
    });
    setJobs([...jobs]);
  }
  const jobsToShow = showAll
        ? jobs
        : jobs.filter(job => job.tyotehtava.toUpperCase().includes(filterText.toUpperCase()))

  const handleFilter = (filteringText) => {
    setFilterText(filteringText);
    if (filteringText === ''){
      setShowAll(true);
      console.log('true');
    }
    else
    {
      setShowAll(false);
    }
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/weather">
            <About />
          </Route>
          <Route path="/">
            <Search onFilter={handleFilter}/>
            <Jobs onCompleted={handleComplete} jobs={jobsToShow} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;