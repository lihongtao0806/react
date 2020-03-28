/****
 * 这是Menu的主入口 
 * 
 * Author Hong-Tao Li
 * 
 * 2020-02-23  
 * 
 * 
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Button, Menu, Input, Select, Icon,  Tabs, } from 'antd'
import A from './A.js'
import B from './B.js'
import './main.css'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

// 这是page引入信息  Content部分
const REG_PAGES = {
    "A": { title: '船舶基础信息', content: <A />, key: 'A', closable: false }, //船舶基础信息
    "B": { title: '船舶证照信息', content: <B />, key: 'B' }, //船舶证照信息
}
//   这是侧边栏部分
let menu = [{
    key: "sub1",
    type: 'video-camera',
    title: '数据管理',
    children: [
        { key: 'A', title: '船舶基础管理', },
        { key: 'B', title: '船舶证照信息', },
        { key: 'ShipTransaction', title: '船舶业务信息', },
    ]
},
];
class Management extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: false,
            defaultPage: [REG_PAGES.A],
            activeKey: 'A',
            openKeys: ['sub1'],
        };
        this.newTabIndex = 0;
    }
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8'];
   
	onOpenChange = openKeys => {

        console.log(openKeys,'openKeys')
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys });
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	};
    componentDidMount(){
        var loginCont = this.refs.loginCont;
        var windowH = window.innerHeight,windowW = window.innerWidth;
        var h = (windowH ) > 500 ? (windowH ) : (500 );
        loginCont.style.height = h+"px";
    
        this.onresize = ()=>{
            var windowH = window.innerHeight,windowW = window.innerWidth;
            var h = (windowH) > 500 ? (windowH ) : (500 );
            loginCont.style.height = h+"px";
          
        }
        window.addEventListener("resize", this.onresize)
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.onresize);
    }
    toggle = () => {
        // this.setState({
        //     collapsed: !this.state.collapsed,
        // });
    };
    // 侧边栏的点击事件
    changepage = (item, key) => {
        const defaultPage = this.state.defaultPage;
        let mykey = item.key
        let newpage = REG_PAGES[mykey]
        console.log(newpage, 'changepage')
        const activeKey = newpage.key
        var result = defaultPage.some(item => {
            if (item.title == newpage.title) {
                return true
            }
        })
        if (result == false) {
            defaultPage.push(newpage)
        }
        this.setState({
            defaultPage: defaultPage,
            activeKey
            // defaultPage:this.state.defaultPage.push([newpage])
        })
    }
    // 推出登录
    liClick() {
        this.props.history.replace('/login')
    }
    // 添加删除tabs
    onChange = activeKey => {
        console.log(activeKey, '看看 activeKey')
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.defaultPage.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const defaultPage = this.state.defaultPage.filter(pane => pane.key !== targetKey);
        if (defaultPage.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = defaultPage[lastIndex].key;
            } else {
                activeKey = defaultPage[0].key;
            }
        }
        this.setState({ defaultPage, activeKey });
    };
    renderMenu_(data, ii) {
        return (
            data.map((menu, index) => {
                if (menu.children) {
                    return (
                        <SubMenu key={menu.key} title={<span><i className={'icon' + index}></i><span>{menu.title}</span></span>}>
                            {this.renderMenu_(menu.children, 'ii')}
                        </SubMenu>
                    )
                } else {
                    return (<Menu.Item key={menu.key}><i className={ii ? ii + index : 'i' + index}></i><span>{menu.title}</span></Menu.Item>)
                }
            })
        )
    }
    render() {
        let { defaultPage } = this.state;
        console.log(defaultPage, '看卡')
        let widthBody = document.querySelector('body').offsetWidth;
        let heightBody = document.querySelector('body').offsetHeight;
        return (
            <div  className="vk-home-wrap">
                <Layout>
                    {/* 侧边栏 */}
                    <div className="ps-tree-cont" ref="loginCont">
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <div className='ls_nav-system'>
                                <span className="ls_nav-system-name">  凉山州水上交通系统</span>
                            </div>
                            <Menu theme="dark"
                                mode="inline"
                                openKeys={ this.state.openKeys }
                                defaultSelectedKeys={[]}
                                onOpenChange={ this.onOpenChange }

                                // defaultOpenKeys={['sub1']}
                                mode="inline"
                                theme="dark"
                                inlineCollapsed={this.state.collapsed}
                                onClick={this.changepage}
                            >
                                {
                                    this.renderMenu_(menu)
                                }
                            </Menu>
                        </Sider>
                    </div>
                    <Layout>
                        <Header style={{ color: 'white', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <span className='login_title'> 管理信息子系统</span>
                            <span className="nav-logout">
                                <Button type="primary" ghost shape="circle" icon="poweroff" data-key="poweroff" onClick={this.liClick.bind(this)}></Button>
                            </span>
                        </Header>
                        <Content
                         className="vk-wrapper-cont"
                            style={{
                                margin: '16px 16px',
                                padding: 16,
                                background: '#fff',
                                minHeight: 280,
                                width:widthBody-282,
                                height:heightBody-64-16-16,
                            }}
                        >
                            <Tabs
                                onChange={this.onChange}
                                activeKey={this.state.activeKey}
                                type="editable-card"
                                onEdit={this.onEdit}
                                hideAdd={true}
                            >
                                {
                                    defaultPage.map((item, index) => (
                                        <TabPane tab={item.title} key={item.key} closable={item.closable}>
                                            {item.content}
                                        </TabPane>
                                    ))
                                }
                            </Tabs>

                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
Management.contextTypes = {
    router: PropTypes.object.isRequired
};
export default Management;