import React, {Component} from "react";
import {Route, Redirect, Switch} from "react-router-dom";
import {Row, Col, Layout } from "antd";

import "./admin.less";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Home from "../home";
import NotFound from "../not-found/not-found";
import ButtonUi from "../ui/button/buttons";
import Modals from "../ui/modals/modals";
import Loadings from "../ui/loading/loadings";
import Notices from "../ui/notice/notices";
import Messages from "../ui/message/messages";
import MyTabs from "../ui/tabs/myTabs";
import Login from "../form/login";
import RegForm from "../form/regForm";
import BaseTables from "../table/base-tables";


const {Footer} = Layout;

class Admin extends Component {
    render() {
        return (
            <Row className="container" >
                <Col span={4} className="nav-left">
                    <LeftNav/>
                </Col>

                <Col span={20} className="main">
                    <Header/>
                    <Row className="content">
                        <Switch>
                            <Redirect from='/' exact to='/home'/>
                            <Route path='/home' component={Home}/>
                            <Route path='/ui/button' component={ButtonUi}/>
                            <Route path='/ui/modal' component={Modals}/>
                            <Route path='/ui/loading' component={Loadings}/>
                            <Route path='/ui/notice' component={Notices}/>
                            <Route path='/ui/message' component={Messages}/>
                            <Route path='/ui/tabs' component={MyTabs}/>
                            <Route path='/form/login' component={Login}/>
                            <Route path='/form/reg' component={RegForm}/>
                            <Route path='/table/base-table' component={BaseTables}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Row>
                    <Footer className="footer">推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Col>

            </Row>
        );

    }
}

export default Admin;