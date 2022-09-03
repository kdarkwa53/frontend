import React from "react";
import { MortgageApplicationForm, ApplicationSuccess } from "../../../Modules/MortgageApply";
import MortgagePreviewPage from "../../../Modules/MyApplications/Pages/MortgagePreviewPage";
import MortgageStatusPage from "../../../Modules/MyApplications/Pages/MortgageStatusPage";
import MyApplications from "../../../Modules/MyApplications/Pages/MyApplications";
import PreQualification from "../../../Modules/PreQualification/PreQualification"
import BorrowerPayment from "../../../Modules/MyApplications/Pages/BorrowerPayment";
import ProfilePage from "../../../Modules/Profile/ProfilePage";
import AuthSignUp from "../../../Modules/SignUp/AuthSignUp";
import NewApplication from "../../../Modules/NewApplication/NewApplication";
import DashboardLayoutRoute from "./DashboardLayout"
import MainLayoutRoute from "./MainLayout"
import Dashboard from "../../../Modules/Dashboard/Dashboard";
import { Redirect, Route, Switch } from "react-router-dom";
import HomeInfo from "../../../Modules/MortgageApply/Pages/HomeInfo"
import ChoosePaymentOption from "../../../Modules/Savings/ChoosePaymentOption"
import Savings from "../../../Modules/Savings/Savings"
import Products from "../../../Modules/Products/Products"
import TransferMoney from "../../../Modules/TransferMoney/TransferMoney"
import JavolinToJavolin from "../../../Modules/TransferMoney/JavolinToJavolin"
import TransferDetails from "../../../Modules/TransferMoney/TransferDetails"
import MakeDeposit from "../../../Modules/Savings/MakeDeposit/MakeDeposit"
import JavolinLoans from "../../../Modules/Products/JavolinLoans";
import FundWallet from "../../../Modules/TransferMoney/FundWallet";
import PrepaidApplication from "../../../Modules/Prepaid/PrepaidApplication";
import RightSider from "../../Components/Layouts/Components/DashboardRightSider";
import WalletRightSider from "../../Components/Layouts/Components/WalletRightSider";
import LayoutView from "./LayoutView";
import WalletPage from "../../../Modules/Wallet/WalletPage";
import PortfolioRightSider from "./Components/PortfolioRightSider";
import GovernmentServices from "../../../Modules/Government/GovernmentServices";
import FeePayment from "../../../Modules/Government/FeePayment";
import MenuCheck from "./Components/MenuCheck";
import PrerulesQuestions from "../../../Modules/TransferMoney/Components/AddBeneficiaryQuestion/PrerulesQuestions";
import Check from "../../../check";
import AirtimeTransfer from "../../../Modules/TransferMoney/AirtimeTransfer";
import SendMoneyIndividual from "../../../Modules/TransferMoney/SendMoneyIndividual";



export default function CustomerRoutes() {   
    return (
        <Switch>
                <DashboardLayoutRoute RightSider={RightSider} menuRoute='/' title="Dashboard" exact path="/" component={Dashboard} />
                <Route path={'/check'} component={Check} />
                <LayoutView primary title="Loans" path="/loans" component={JavolinLoans} />
                <LayoutView primary title="Government Fees" exact path="/government-services" component={GovernmentServices} />
                <LayoutView primary title="Government Fees" path="/government-services/fee" component={FeePayment} />
                <MainLayoutRoute title="Mobile Money" path="/transfers/momo" exact component={TransferDetails} />
                <MainLayoutRoute title="Javolin-to-Javolin" path="/transfers/javolin" exact component={JavolinToJavolin} />
                <MainLayoutRoute title="Deposit" path="/make-deposit" exact component={MakeDeposit} />
                <MainLayoutRoute title="Send Money" path="/send-money" exact component={SendMoneyIndividual} />
                <Route path="/preq" component={PreQualification} />
                <MainLayoutRoute path="/payment" component={BorrowerPayment} />
                <DashboardLayoutRoute RightSider={RightSider} title="Transactions" path="/transactions" component={Savings} />
                <MainLayoutRoute title="Payment Option" path="/payment-option" component={ChoosePaymentOption} />
                <MainLayoutRoute title="Mortgage Application" path="/apply" component={MortgageApplicationForm} />
                <MainLayoutRoute title="Application" path="/application/:id" component={MortgageApplicationForm} />
                <MainLayoutRoute path="/new-application" component={NewApplication} />
                <Route path="/homeInfo" component={HomeInfo} />
                <LayoutView primary path="/preview/:id" component={MortgagePreviewPage} />
                <MainLayoutRoute title="Transfer Money" path="/transfer" component={TransferMoney} />
                <MainLayoutRoute title="Fund My Wallet" path="/fund-wallet" component={FundWallet} />
                <MainLayoutRoute title="Buy Airtime" path="/transfers/airtime" component={AirtimeTransfer} />
                <LayoutView menuRoute="/profile" background="#F0F4FD" title="Profile" path="/profile" component={ProfilePage} />
                <MainLayoutRoute path="/mortgage-success" component={ApplicationSuccess} />
                <LayoutView primary path="/status/:id" component={MortgageStatusPage} />
                <MainLayoutRoute path="/auth" component={AuthSignUp} />
                <LayoutView primary path="/applications" component={MyApplications} />
                <DashboardLayoutRoute RightSider={PortfolioRightSider} title="Portfolio" path="/portfolio" component={Products} />
                <MainLayoutRoute path="/prepaid/apply/:id" component={PrepaidApplication} />
                <DashboardLayoutRoute RightSider={WalletRightSider} menuRoute="/wallet" title="Wallet" path="/wallet" component={WalletPage} />
                <Route path="/check" component={MenuCheck} />
                <MainLayoutRoute title="Send Money" path="/business/pre-rules" exact component={PrerulesQuestions} />
                <Redirect to="/" />
        </Switch>
    );
}
