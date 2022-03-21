import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import './AccountTemplates.css'
import { history } from "../../App";
import { useHistory } from 'react-router-dom';

import { TOKEN, USER_LOGIN, USER_SIGNUP } from '../../util/settings/config';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { Dropdown, Menu, Select } from 'antd';
import { HomeOutlined, DownOutlined, UserOutlined, BarChartOutlined,UsergroupAddOutlined } from '@ant-design/icons';

// import { useHistory } from 'react-router-dom';




const AccountTemplates = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const history = useHistory();
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
                        history.push('/admin/films')
                        // window.location.reload()
                    }}>
            <BarChartOutlined />  Quản lý phim
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

    // const {history} = useHistory();
    useEffect(() => {
        window.scrollTo(0, 0)
      })

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />

    }

      

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match
        return <Fragment>
            <div className="full_body">
                <div className="video-bg">
                    <video width={320} height={240} autoPlay loop muted>
                        <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="app">
                    <div className="header">
                        <div className="menu-circle" />
                        <div className="header-profile">
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
                }} style={{ backgroundColor: '#3a6df0', color: '#ffffff', borderRadius: '25px', justifyContent: 'center', alignItems: 'center', height: '30px', width: '100px' }}>Đăng Xuất</button>
            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="left-side">
                            <div className="side-wrapper">
                                <div className="side-title">Quản lý cá nhân</div>
                                <div className="side-menu">
                                    <NavLink to="/account/acc">
                                        <svg viewBox="0 0 512 512" fill="currentColor">
                                            <path d="M497 151H316c-8.401 0-15 6.599-15 15v300c0 8.401 6.599 15 15 15h181c8.401 0 15-6.599 15-15V166c0-8.401-6.599-15-15-15zm-76 270h-30c-8.401 0-15-6.599-15-15s6.599-15 15-15h30c8.401 0 15 6.599 15 15s-6.599 15-15 15zm0-180h-30c-8.401 0-15-6.599-15-15s6.599-15 15-15h30c8.401 0 15 6.599 15 15s-6.599 15-15 15z" />
                                            <path d="M15 331h196v60h-75c-8.291 0-15 6.709-15 15s6.709 15 15 15h135v-30h-30v-60h30V166c0-24.814 20.186-45 45-45h135V46c0-8.284-6.716-15-15-15H15C6.716 31 0 37.716 0 46v270c0 8.284 6.716 15 15 15z" />
                                        </svg>
                                        Quản lý người dùng
                                    </NavLink>
                                    <NavLink to="/account/acc/addacc">
                                        <svg viewBox="0 0 512 512" fill="currentColor">
                                            <path d="M0 331v112.295a14.996 14.996 0 007.559 13.023L106 512V391L0 331zM136 391v121l105-60V331zM271 331v121l105 60V391zM406 391v121l98.441-55.682A14.995 14.995 0 00512 443.296V331l-106 60zM391 241l-115.754 57.876L391 365.026l116.754-66.15zM262.709 1.583a15.006 15.006 0 00-13.418 0L140.246 57.876 256 124.026l115.754-66.151L262.709 1.583zM136 90v124.955l105 52.5V150zM121 241L4.246 298.876 121 365.026l115.754-66.15zM271 150v117.455l105-52.5V90z" />
                                        </svg>
                                        Thêm người dùng
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="main-container">
                            <div className="content-wrapper">
                            <Component {...propsRoute}/>
                            </div>
                        </div>
                    </div>
                    <div className="overlay-app" />
                </div>
            </div>

        </Fragment>

    }} />
    

}


export default AccountTemplates;



