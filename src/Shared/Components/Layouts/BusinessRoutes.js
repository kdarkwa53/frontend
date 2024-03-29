import React, { useEffect } from "react";
import { MortgageApplicationForm, ApplicationSuccess } from "../../../Modules/MortgageApply";
import MortgagePreviewPage from "../../../Modules/MyApplications/Pages/MortgagePreviewPage";
import MortgageStatusPage from "../../../Modules/MyApplications/Pages/MortgageStatusPage";

import MyApplications from "../../../Modules/MyApplications/Pages/MyApplications";
import PreQualification from "../../../Modules/PreQualification/PreQualification"
import BorrowerPayment from "../../../Modules/MyApplications/Pages/BorrowerPayment";
import AuthSignUp from "../../../Modules/SignUp/AuthSignUp";
import NewApplication from "../../../Modules/NewApplication/NewApplication";
import DashboardLayoutRoute from "./DashboardLayout"
import MainLayoutRoute from "./MainLayout"
import { Redirect, Route, Switch } from "react-router-dom";
import HomeInfo from "../../../Modules/MortgageApply/Pages/HomeInfo"
import ChoosePaymentOption from "../../../Modules/Savings/ChoosePaymentOption"
import Savings from "../../../Modules/Savings/Savings"
import TransferMoney from "../../../Modules/TransferMoney/TransferMoney"

import AirtimeTransfer from "../../../Modules/TransferMoney/AirtimeTransfer"
import MakeDeposit from "../../../Modules/Savings/MakeDeposit/MakeDeposit"
import JavolinLoans from "../../../Modules/Products/JavolinLoans";
import BusinessPreq from "../../../Modules/PreQualification/BusinessPreq";
import BusDashboard from "../../../Modules/Dashboard/BusDashboard";

import SendMoney from "../../../Modules/TransferMoney/SendMoney";
import FundWallet from "../../../Modules/TransferMoney/FundWallet";
import PrepaidApplication from "../../../Modules/Prepaid/PrepaidApplication";
import WalletRightSider from "../../Components/Layouts/Components/WalletRightSider";

import LayoutView from "./LayoutView";
import WalletPage from "../../../Modules/Wallet/WalletPage";
import PortfolioRightSider from "./Components/PortfolioRightSider";
import GovernmentServices from "../../../Modules/Government/GovernmentServices";
import FeePayment from "../../../Modules/Government/FeePayment";
import BusRightSider from "./Components/BusinessDashboardSider";
import RoleManagement from "../../../Modules/UserManagement/RoleManagment";
import UserManagement from "../../../Modules/UserManagement/UserManagement";
import MenuCheck from "./Components/MenuCheck";
import PrerulesQuestions from "../../../Modules/TransferMoney/Components/AddBeneficiaryQuestion/PrerulesQuestions";
import BeneficiaryDetails from "../../../Modules/TransferMoney/Components/AddBeneficiaryQuestion/BeneficiaryDetails";
import SendMoneyInt from "../../../Modules/TransferMoney/SendMoneyInt";
import BusinessKYCForm from "../../../Modules/BusinessKYC/Pages/BusinessKYCForm";
import BusinessKYCLayout from "./BusinessKYCLayout";
import BusinessProducts from "../../../Modules/Products/BusinessProducts";
import BusinessProfilePage from "../../../Modules/Profile/BusinessProfilePage";
import Check from "../../../check";
import IbanValidation from "../../../Modules/TransferMoney/Components/AddBeneficiaryQuestion/IbanValidation";
import ForexBeneficiary from "../../../Modules/TransferMoney/ForexBeneficiary";
import { getRulesCurrencies, getRunningHeader } from "../duck/action";
import { useDispatch, useSelector } from "react-redux";
import ForexSend from "../../../Modules/TransferMoney/ForexSend";
import SendMoneyForex from "../../../Modules/TransferMoney/SendMoneyForex";
import PendingRequests from "../../../Modules/UserManagement/PendingRequests";
import InstructForex from "../../../Modules/TransferMoney/InstructForex";
import { getBeneficiaries } from "../../../Modules/TransferMoney/duck/action";
export default function BusinessRoutes() {
    const text = useSelector((state) => state.language)
    const currency = useSelector((state) => state?.resources?.base_currency)
    
    const dispatch = useDispatch()
    const curr = currency ? currency : "USD"
    useEffect(()=>{
        dispatch(getRulesCurrencies())
        dispatch(getBeneficiaries())
        dispatch(getRunningHeader(curr))
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Switch>
                <DashboardLayoutRoute menuRoute='/' title={text["DASHBOARD"]} exact path="/" component={BusDashboard} />
                <Route path={'/check'} component={Check} />
                <DashboardLayoutRoute path="/business/dashboard" component={BusDashboard} />
                <LayoutView primary title={text["Loans"]} path="/business/loans" component={JavolinLoans} />
                <LayoutView primary title={"Government Fees"} exact path="/business/government-services" component={GovernmentServices} />
                <LayoutView primary title="Government Fees" path="/business/government-services/fee" component={FeePayment} />
                <MainLayoutRoute title="Deposit" path="/make-deposit" exact component={MakeDeposit} />
                <MainLayoutRoute title={text["Dashboard"]} subtitle={`${text["Home"]} / `} breadSub={text["Send Money"]} path="/send-money" exact component={SendMoney} />
                <MainLayoutRoute title={text["Dashboard"]} subtitle={`${text["Home"]} / `} breadSub={text["Send Money"]} menuRoute="/business/payments" path="/business/payments" exact component={SendMoney} />
                <MainLayoutRoute title={text["Dashboard"]} subtitle={`${text["Home"]} / `} breadSub={text["Forex"]} path="/business/forex" exact component={ForexBeneficiary} />
                <Route path="/preq" component={PreQualification} />
                <MainLayoutRoute path="/payment" component={BorrowerPayment} />
                <MainLayoutRoute title={text["Transactions"]} subtitle={`${text["Home"]} / `} breadSub={text["Transactions"]}  menuRoute="/business/transactions" path="/business/transactions" component={Savings} />
                <MainLayoutRoute title="Payment Option" path="/payment-option" component={ChoosePaymentOption} />
                <MainLayoutRoute title="Mortgage Application" path="/apply" component={MortgageApplicationForm} />
                <MainLayoutRoute title="Application" path="/application/:id" component={MortgageApplicationForm} />
                <MainLayoutRoute path="/new-application" component={NewApplication} />
                <Route path="/homeInfo" component={HomeInfo} />
                <MainLayoutRoute path='/beneficiary' component={BeneficiaryDetails} />
                <MainLayoutRoute title={text['Business Account Application']} subtitle={`${text["Home"]} / `} breadSub={text["Business KYC"]}  path='/business/compliance' component={BusinessKYCForm} />
                <LayoutView primary path="/preview/:id" component={MortgagePreviewPage} />
                <MainLayoutRoute title={text["Transfer Money"]} path="/business/transfer" component={TransferMoney} />
                <MainLayoutRoute title={text["Send Money"]} path="/send-money/international" component={SendMoneyInt} />
                <MainLayoutRoute title={text["Forex"]} path="/send-money/forex" component={SendMoneyForex} />
                <MainLayoutRoute title={text["Forex"]} path="/business/instruct-forex" component={InstructForex} />
                <MainLayoutRoute title={text["Send Money"]} path="/business/forex" component={ForexSend} />
                <MainLayoutRoute title={text["Fund My Wallet"]} path="/business/fund-wallet" component={FundWallet} />
                <LayoutView menuRoute="/profile" background="#F0F4FD" title="Profile" path="/business/profile" component={BusinessProfilePage} />
                <MainLayoutRoute path="/mortgage-success" component={ApplicationSuccess} />
                <LayoutView primary path="/status/:id" component={MortgageStatusPage} />
                <MainLayoutRoute path="/auth" component={AuthSignUp} />
                <LayoutView primary path="/applications" component={MyApplications} />
                <MainLayoutRoute subtitle={text["Users"]} primary path="/user-management" title={text["User Management"]} component={UserManagement} />
                <MainLayoutRoute subtitle={text["Roles"]} primary path="/role-management" title={text["User Management"]} component={RoleManagement} />
                <MainLayoutRoute  subtitle={text["Transactions"]}  path="/business/requests" title={text["Pending Requests"]} component={PendingRequests} />
                <DashboardLayoutRoute RightSider={BusRightSider} title="Portfolio" path="/business/portfolio" component={BusinessProducts} />
                <MainLayoutRoute path="/prepaid/apply/:id" component={PrepaidApplication} />
                <MainLayoutRoute subtitle={text["Manage your wallet"]} menuRoute="/business/wallet" title={text["Wallet"]} path="/business/wallet" component={WalletPage} />
                <Route path="/check" component={MenuCheck} />
                <MainLayoutRoute title={text["Send Money"]} path="/business/pre-rules" exact component={PrerulesQuestions} />
                <MainLayoutRoute title={text["Send Money"]} path="/business/iban-validation" exact component={IbanValidation} />
                <DashboardLayoutRoute RightSider={BusRightSider} menuRoute='/' title="Dashboard" exact path="/" component={BusDashboard} />
                <MainLayoutRoute title="Airtime" path="/transfers/airtime" exact component={AirtimeTransfer} />
                <Route path="/business/preq" component={BusinessPreq} />
                <Redirect to="/" />
        </Switch>
    );
}
