import React, { Fragment, useEffect } from 'react'
import { Route } from "react-router-dom";
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import Background from './bg_register.jpg'
import logo from './../../assets/logofilm/Oxfilm.png'
import { NavLink } from 'react-router-dom';




export const RegisterTemplate = (props) => {  //path,exact,Component

    const { Component, ...restProps } = props;

    useEffect(() => {
        window.scrollTo(0, 0)
      })

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match
        return <Fragment>
            <div style={{background: `url(${Background})` , backgroundSize: '150%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                effectColor="#C780FF" // required
                color="#14AEFF" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <NavLink to="/"><img style={{width:'180px'}} src={logo} alt="123"/></NavLink>
                <Component {...propsRoute}/>
            </CustomCard>
        </div>

        </Fragment>

    }} />
}
