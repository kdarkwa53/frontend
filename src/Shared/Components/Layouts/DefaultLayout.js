import React, { useEffect } from "react";
import {  Redirect } from "react-router-dom";


import { Layout } from "antd";


import { getAllSecurityQuestions, getBanksAndMomos, getCurrencies, getFundingSource, getUserSecurityQuestions, getWallets } from "../duck/action";
import { getPrepaid } from "../../../Modules/Prepaid/duck/action";
import { useDispatch } from "react-redux";
import  IdleTimer  from "../../../helpers/IdleTimer";
import { userTimerOut } from "../../../Modules/Login/duck/action";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import {getPendingTransactions, getPermissions, getRoles, getUsers} from "../../../Modules/UserManagement/duck/action"

import BusinessRoutes from "./BusinessRoutes";
import CustomerRoutes from "./CustomerRoutes";
import { getTransactions } from "../../../Modules/Savings/duck/action";
export default function DefaultLayout() {

  const dispatch = useDispatch()
  const history = useHistory()
  const accountType = Cookies.get('userType')
  useEffect(() => {
   
    dispatch(
      getBanksAndMomos()
    )
    
    dispatch(getFundingSource())
    dispatch(getAllSecurityQuestions())
    dispatch(getPrepaid())
    dispatch(getTransactions())
    dispatch(getUserSecurityQuestions())
    dispatch(getCurrencies())
    dispatch(getPermissions())
    dispatch(getWallets())
    dispatch(getRoles())
    dispatch(getUsers()) 
    dispatch(getPendingTransactions())
    // const timer = new IdleTimer({
    //   timeout: 600,
    //   onTimeout: () => {
    //     dispatch(userTimerOut(history, accountType))
    //   },

    //   onExpired: () => {
    //   }
    // });

    // return () => {
    //   timer.cleanUp();
    // };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const user = Cookies.get("userType");
  const user = "business"
  
 console.log('I see you: ',user)
  return (
    <Layout>
        {
          user === 'customer'?(
            <>
            {console.log('man')}
            <CustomerRoutes />
            </>
           
          ): ""
        }
        {
          user === 'business' ? (
            <BusinessRoutes />
          ) : ""
        }
    </Layout>
  );
}
