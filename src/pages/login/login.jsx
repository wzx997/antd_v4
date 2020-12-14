import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import "./login.less";
import logo from "../../assets/images/logo.png";
import LoginForm from "./loginForm";
import RegForm from "./regForm";
import ResetPwdForm from "./resetPwdForm";

/**
 * 登录的路由组件
 */
class Login extends Component{
    state = {
        loading: false
    }

    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>

                <header className="content">
                    <Switch>
                        <Route path='/login' exact component={LoginForm}/>
                        <Route path='/login/reg' component={RegForm}/>
                        <Route path='/login/reset_pwd' component={ResetPwdForm}/>
                        {/*<Redirect to='/login'/>*/}
                    </Switch>
                </header>

            </div>
        );
    }
}

export default Login;