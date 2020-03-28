import React from 'react';
import './App.css';
import './assets/css/base.css'
import {BrowserRouter,Route,HashRouter} from 'react-router-dom';
import Routers from './router/Routers'
class App extends React.Component{
  render(){
    return (
      <HashRouter basename="/patrol">
        <Routers/>
      </HashRouter>
    );
  }
}

export default App;
