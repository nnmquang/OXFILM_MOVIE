import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import logo from './Oxfilm.png'
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu, Select } from 'antd';
import { DownOutlined, UserOutlined, BarChartOutlined,UsergroupAddOutlined } from '@ant-design/icons';

//Hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN, USER_SIGNUP } from '../../../../util/settings/config';


const { Option } = Select;

export default function Header(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        // console.log(`selected ${value}`);
        i18n.changeLanguage(value)
    }

    const history = useHistory();

    const styleText = {
        color: 'pink',
        padding: '15px',
        backgroundColor: 'black'
    }

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
                        history.push('/account/acc')
                        // window.location.reload()
                    }}>
            <UsergroupAddOutlined />  Quản lý tài khoản
            </button>
          </Menu.Item>
          
          
          
        </Menu>
      );

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-8 py-3 rounded">{t('signin')}</button>
                <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">{t('signup')}</button>
            </Fragment>
        }

        return <Fragment>
            <div className='flex px-2 text-justify'>
                <div style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', color: 'white' }} className="ml-5 rounded-full, bg-green-400">
                    {userLogin.taiKhoan.substr(0, 1)}
                </div>
                {/* <div style={{ justifyContent: 'center', alignItems: 'center', margin: '5px' }}>
                    {!_.isEmpty(userLogin) ? <button onClick={() => {
                        history.push('/profile')
                        // window.location.reload()
                    }} className='text-white'>
                        Hello ! {userLogin.taiKhoan}</button> : ''}
                </div> */}

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

    }


    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/" rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                    <img style={{ width: '180px' }} src={logo} alt="123" />


                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white-600 border-white-600 text-white" activeClassName="border-b-2 border-gray-300">{t('Home')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white-600 border-white-600 text-white" activeClassName="border-b-2 border-gray-300">{t('Contact')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white-600 border-white-600 text-white" activeClassName="border-b-2 border-gray-300">{t('News')}</NavLink>
                    </li>

                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">

                    {renderLogin()}

                    {/* <Select defaultValue="en" style={{ width: 60 }} onChange={handleChange}>
                        <Option value="en">Eng</Option>
                        <Option value="chi">Chi</Option>

                        <Option value="vi">Vi</Option>
                    </Select> */}
                </div>

                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
