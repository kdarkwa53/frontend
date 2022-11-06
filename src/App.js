import 'antd/dist/antd.less';
import React, { useEffect } from "react"
// import { RecoverPassword, PasswordReset, Login, PhoneVerification, BusLogin } from "./Modules/Login";

import DefaultLayout from "./Shared/Components/Layouts/DefaultLayout";
import PrivateRoute from "./Shared/Components/Layouts/PrivateRoute";
import { useDispatch } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom";
import { changeLanguage, } from "./Shared/actions/actions";
import { useSelector } from "react-redux"
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Cookies from 'js-cookie';
import { getCurrencies, getDefaultCurrencies } from './Shared/Components/duck/action';




function App() {

  

  useEffect(() => {
    dispatch(
      changeLanguage(state.selectedLang)
    )
    dispatch(
      getDefaultCurrencies()
    )
    
    dispatch(getCurrencies())
    
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.language)

  const userToken = Cookies.get("javAccessToken");
 

  return (

    <Router>
      <PrivateRoute path="/" token={userToken} component={DefaultLayout} /> : 
    </Router>

  );
}


const AppWrapped = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}
export default AppWrapped;