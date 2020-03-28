import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import './assets/css/base.css'
import App from './App';
import {BrowserRouter,Route,HashRouter} from 'react-router-dom'
ReactDom.render(
    <HashRouter>
       <App/>
    </HashRouter>
    ,
    document.getElementById('root')
);

