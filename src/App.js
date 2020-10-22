import React,{useState,useEffect} from 'react';
import './App.css';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import NotFound from './NotFound';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";


function App() {
  return (
    <div className="App">
      <div>
        <Router>
        <Nav/>
          <Switch>
            <Route exact path="/" component={RecipeList}/>
            <Route path="/recipe/:uri" component={RecipeDetails}/>
            <Route component={NotFound}/>
          </Switch>
          </Router>
      </div>
    </div>
  );
}

export default App;
