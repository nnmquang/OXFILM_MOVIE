import logo from '../../assets/logofilm/Oxfilm.png'
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { TOKEN, USER_LOGIN, USER_SIGNUP } from "../../util/settings/config";
import { Layout, Menu, Breadcrumb } from 'antd';
import { useHistory } from 'react-router-dom';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    DownOutlined,
    BarChartOutlined,
    HomeOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import { Dropdown, Select } from 'antd';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



const AdminTemplate = (props) => { //path, exact, Component
    const history = useHistory();

    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

    })

    const menu = (
        <Menu>
          <Menu.Item >
            <button onClick={() => {
                        history.push('/profile')
                        // window.location.reload()
                    }}>
            <UserOutlined />  Thông tin cá nhân
            </button>
          </Menu.Item>
          <Menu.Item >
            <button onClick={() => {
                        history.push('/account/acc')
                        // window.location.reload()
                    }}>
            <UsergroupAddOutlined />  Quản lý tài khoản
            </button>
          </Menu.Item>
          <Menu.Item >
            <button onClick={() => {
                        history.push('/')
                        // window.location.reload()
                    }}>
            <HomeOutlined />  Trang Chủ
            </button>
          </Menu.Item>
          
          
          
        </Menu>
      );

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />

    }

    const operations = <Fragment>
        <div className='flex px-2 text-justify'>
            <div style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', color: 'white' }} className="ml-5 rounded-full, bg-green-400">
                {userLogin.taiKhoan.substr(0, 1)}
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', margin: '5px' }}>
            {!_.isEmpty(userLogin) ? <Dropdown overlay={menu}>
                    <button className='text-white'>
                        Hello ! {userLogin.taiKhoan} <DownOutlined /></button> 
                    </Dropdown> : ''}
            </div>
            <div>
                <button onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(USER_SIGNUP);
                    localStorage.removeItem(TOKEN);
                    history.push('/home');
                    window.location.reload();
                }} style={{ backgroundColor: '#7d78ff', color: '#ffffff', borderRadius: '25px', justifyContent: 'center', alignItems: 'center', height: '30px', width: '100px' }}>Đăng Xuất</button>
            </div>
        </div>
    </Fragment>


    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo p-5">
                        <NavLink to="/"><img style={{ width: '180px' }} src={logo} alt="123" /></NavLink>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        {/* <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Users</NavLink>
                        </Menu.Item> */}
                        <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                            <Menu.Item key="10" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>

                            </Menu.Item>
                            <Menu.Item key="11" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add new</NavLink>


                            </Menu.Item>
                        </SubMenu>
                        {/* <Menu.Item key="3" icon={<DesktopOutlined />}>
                            <NavLink to="/admin/showtimes">Showtime</NavLink>
                        </Menu.Item> */}
                        {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="text-right pr-10 pt-1">{operations}</div>
                    </Header> */}
                    <header style={{ backgroundColor: '#001529', padding: 0 }}>
                        <div className="container flex justify-between h-16 mx-auto">
                            <NavLink to="/" rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                                {/* <img style={{ width: '180px' }} src={logo} alt="123" /> */}


                            </NavLink>

                            <div className="items-center flex-shrink-0 hidden lg:flex">
                                <div className="text-right pr-5 pt-1">{operations}</div>
                            </div>
                        </div>
                    </header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                </Layout>
            </Layout>
        </Fragment>
    }} />

}


export default AdminTemplate;