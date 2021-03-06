import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN, USER_SIGNUP } from "../../util/settings/config";


export const CheckoutTemplate = (props) => {  //path,exact,Component
    
    const {Component,...restProps} = props;

    useEffect(() => {
        window.scrollTo(0, 0)
      })

    if(!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login'/>
    }

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match
        return <Fragment>
           <Component {...propsRoute}/>
        </Fragment>

    }} />
}