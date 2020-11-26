import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Menu} from "antd";

import "./index.less";
import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";

const SubMenu = Menu.SubMenu;

/*
左侧导航组件
 */
class LeftNav extends Component {
    //渲染菜单
    getMenuNodes = menuList => {
        const path = this.props.location.pathname;

        return menuList.reduce((pre, item) => {
            //像pre中添加元素
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ));
            } else {
                // 查找一个与当前请求路径匹配的子Item，用找下标的方法是解决产品子路由即详细等页面的刷新打开问题
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
                // const cItem = item.children.find(cItem => cItem.key === path);
                // 如果存在, 说明当前item的子列表需要打开
                if (cItem) {
                    this.openKey = item.key;
                }

                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                    <span>{item.title}</span>
                                </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ));
            }

            return pre;
        }, []);
    }

    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        // 得到当前请求的路由路径
        let path = this.props.location.pathname;

        //找下标的方式是解决产品子路由的选中问题
        if(path.indexOf('/product')===0) { // 当前请求的是商品或其子路由界面
            path = '/product';
        }

        // 得到需要打开菜单项的key
        const openKey = this.openKey;

        return (
            <div className="left-nav">
                <Link to='/' className="header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    { this.menuNodes }
                </Menu>
            </div>
        );
    }
}

/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default withRouter(LeftNav);
