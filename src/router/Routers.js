/*
 *   路由配置
 */
import { Router, Route, IndexRoute, Redirect, Switch } from 'react-router'
import React, { Component } from 'react'
import Upload from '../pages/upload/Upload.js'
import Login from '../pages/login/Login.js'
import Main from '../pages/main/main.js'; //主页面
class Routers extends Component {
    render() {
        return (
            <Switch>
                <Route path="/upload" component={Upload}/>
                <Route path="/login" component={Login}/>
                <Route path="/main" component={Main}/>
                <Route path="/" component={Login}/>
            </Switch>
        )
    }
}

export default Routers;
