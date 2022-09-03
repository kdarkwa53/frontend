import 'antd/dist/antd.less';
import React from "react"
import { RecoverPassword, PasswordReset, Login, PhoneVerification, BusLogin } from "../../../Modules/Login";

// import DefaultLayout from "./Shared/Components/Layouts/DefaultLayout";
// import PrivateRoute from "./Shared/Components/Layouts/PrivateRoute";
import SignUp from "../../../Modules/SignUp/SignUp";
import AuthUserLayoutRoute from "../../../Shared/Components/Layouts/AuthUserLayout"

// import { store, persistor } from "./store";
import { Switch, Redirect } from "react-router-dom"
// import { PersistGate } from "redux-persist/integration/react";
import LoginOption from '../../../Modules/Login/Pages/LoginOption';
import SignUpPage2 from '../../../Modules/SignUp/SignUpPage2';
import SignUpHome from '../../../Modules/SignUp/SignUpHome';
// import BusinessSignUpPage2 from '../../Modules/SignUp/BusinessSignUpPage2';
import BusinessSignUp from '../../../Modules/SignUp/BusinessSignUp';
import BusinessSignUpPage2 from '../../../Modules/SignUp/BusinessSignUpPage2';



function InitialLayout() {

    return (

        <Switch>
            <AuthUserLayoutRoute title="Phone Verification" path="/phone" component={PhoneVerification} />
            <AuthUserLayoutRoute title="Login" exact path="/login" component={Login} />
            <AuthUserLayoutRoute title="Login" path="/login-option" component={LoginOption} />
            <AuthUserLayoutRoute title="Login" path="/business/login" component={BusLogin} />
            <AuthUserLayoutRoute exact title="Signup" path="/signup" component={SignUp} />
            <AuthUserLayoutRoute exact title="Signup" path="/register" component={SignUpHome} />
            <AuthUserLayoutRoute title="Recover Password" path="/forgot-password" component={RecoverPassword} />
            <AuthUserLayoutRoute title="Password Reset" path="/password-reset" component={PasswordReset} />
            <AuthUserLayoutRoute path="/signup/2" component={SignUpPage2} />
            <AuthUserLayoutRoute exact path="/business/signup/2" component={BusinessSignUp} />
            <AuthUserLayoutRoute path="/business/signup" component={BusinessSignUpPage2} />
            <Redirect to="/login" />
        </Switch>

    );
}



export default InitialLayout;