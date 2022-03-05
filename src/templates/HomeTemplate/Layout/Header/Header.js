import React from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import logo from './Oxfilm.png'
import { useHistory } from 'react-router-dom';

export default function Header(props) {

    const history = useHistory();

    const styleText = {
            color : 'pink',
            padding : '15px',
            backgroundColor : 'black'
        }
    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/" rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                    <img style={{width:'180px'}} src={logo} alt="123"/>
                    
                    
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white-600 border-white-600 text-white" activeClassName="border-b-2 border-gray-300">Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white-600 border-white-600 text-white" activeClassName="border-b-2 border-gray-300">Contact</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white-600 border-white-600 text-white" activeClassName="border-b-2 border-gray-300">News</NavLink>
                    </li>
                    
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <button onClick={()=>{
                        history.push('/login')
                    }} className="self-center px-8 py-3 rounded">Sign in</button>
                    <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">Sign up</button>
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
