import React from "react";
import { Route } from "react-router-dom";
import InitialLayout from "./InitialLayout";


const PrivateRoute = ({
    component: Component,
    token,
    ...rest
}) => {
 
    return (
        <>
            <Route {...rest}
                render={
                    (props) => token ? <Component {...props} /> : <InitialLayout />
                }
            />

        </>);
};
export default PrivateRoute;
