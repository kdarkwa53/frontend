import React, { useState } from "react";
import "tabler-react/dist/Tabler.css";
import Direction from "../../Shared/Components/Direction"
import Styles from "./PreQualification.module.css"
import ProgressBar from "../../Shared/Components/ProgressBar";
import ProductCard from "../../Shared/Components/ProductCard"
import InputQP from "../../Shared/Components/InputQP"
import { Row } from "antd"
import { CreditCard, Wallet, Loan, Transfer, Finance, HomeIcon, ThumbsDown, ThumbsUp } from "../../Shared/Components/JavIcons"
import { useDispatch } from "react-redux"
import {
    showErrorNotification,
} from "../../Shared/actions/alert.actions";

import { useRouteMatch, Route, Switch, useHistory } from "react-router-dom"


const ServiceTypeAnswers = ({ handleValueChange, name, selectedValue }) => {
    return (
        <>
            <ProductCard onChange={handleValueChange} name={name} selectedValue={selectedValue} value="loan" icon={<Loan width="100%" />} label="Loan" />
            <ProductCard onChange={handleValueChange} name={name} selectedValue={selectedValue} value="savings" icon={<Wallet width="100%" />} label="Savings" />
            <ProductCard onChange={handleValueChange} name={name} selectedValue={selectedValue} value="creditCard" icon={<CreditCard width="100%" />} label="Secure credit card" />
            <ProductCard onChange={handleValueChange} name={name} selectedValue={selectedValue} value="transfer" icon={<Transfer width="100%" />} label="Send money" />
        </>
    )
}

const YesOrNoChoice = ({ handleValueChange, name, selectedValue }) => {
    return (
        <>
            <ProductCard onChange={handleValueChange} selectedValue={selectedValue} name={name} value="yes" icon={<ThumbsUp width="100%" />} label="Yes" />
            <ProductCard onChange={handleValueChange} selectedValue={selectedValue} name={name} value="no" icon={<ThumbsDown width="100%" />} label="No" />
        </>
    )
}
const LoanTypeAnswers = ({ handleValueChange, name, selectedValue }) => {
    return (
        <>
            <ProductCard onChange={handleValueChange} selectedValue={selectedValue} name={name} value="mortgage" icon={<HomeIcon width="100%" />} label="Mortgage" />
            <ProductCard onChange={handleValueChange} selectedValue={selectedValue} name={name} value="otherLoanProducts" icon={<Finance width="100%" />} label="Other Loan Products" />
        </>)
}

const SlideTemplate = ({ question, answer, prevLink, nextLink, progress }) => {
    return (
        <div className={Styles.container}>
            <div className={Styles.content}>
                <div className={Styles.pq_question}>
                    {question}
                </div>
                <div className={Styles.directions}>
                    <Direction value="open" onClick={prevLink} arrow="left" />
                    <Direction value="close" onClick={nextLink} arrow="right" />
                </div>
                <Row justify="center" align="middle" style={{ width: "100%", minHeight: 300, }} gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} >
                    {answer}
                </Row>
            </div>
            <div className={Styles.answerSection}>
            </div>
        </div>
    )
}



const PreQualification = () => {
    const history = useHistory()

    const handleDirClick = (route, type, prog) => {
        if (!(route && type && prog)) {

            history.goBack()
            return
        }

        if (info[type]) {
            handleProgress(prog)
            history.push(route)
        } else {
            dispatch(
                showErrorNotification(
                    "Please answer the question to move"
                )
            );
        }
        // setAnswered(false)
    }
    const dispatch = useDispatch();

    const [progress, setProgress] = useState(5);

    const handleValueChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        // setAnswered(true)
        setInfo(
            {
                ...info,
                [name]: value
            }
        )
    }

    const handleProgress = (prog) => {
        setProgress(prog)
    }


    let { path } = useRouteMatch();

    // const [answered, setAnswered] = useState(false)
    const [info, setInfo] = useState({ loanAmount: "" })
    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.content}>
                    <div className={Styles.bar}>
                        <ProgressBar size="sm" percentage={progress}></ProgressBar>
                    </div>
                </div>
            </div>

            <Switch>
                <Route exact path={path}>
                    <SlideTemplate
                        question="Which product or service would you like?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/loan-type`, "serviceType", 20)}

                        answer={
                            <ServiceTypeAnswers
                                handleValueChange={handleValueChange}
                                name="serviceType"
                                selectedValue={info["serviceType"]}
                            />}
                    />
                </Route>
                <Route path={`${path}/loan-type`}>
                    <SlideTemplate
                        question="What type of loan do you want?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/downpayment`, "loanType", 30)}
                        answer={
                            <LoanTypeAnswers
                                handleValueChange={handleValueChange}
                                name="loanType"
                                selectedValue={info["loanType"]}
                            />
                        }
                    />
                </Route>
                <Route path={`${path}/downpayment`}>
                    <SlideTemplate
                        question="Do you have downpayment for the loan product?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/employment`, "hasDownpayment", 50)}
                        answer={
                            <YesOrNoChoice
                                handleValueChange={handleValueChange}
                                name="hasDownpayment"
                                selectedValue={info["hasDownpayment"]}
                            />}
                    />
                </Route>
                <Route path={`${path}/employment`}>
                    <SlideTemplate
                        question="Are you currently employed?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/first-time`, "isEmployment", 65)}
                        answer={
                            <YesOrNoChoice
                                handleValueChange={handleValueChange}
                                name="isEmployment"
                                selectedValue={info["isEmployment"]}
                            />}
                    />
                </Route>
                <Route path={`${path}/first-time`}>
                    <SlideTemplate
                        question="Are you a first time borrower?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/amount`, "firstTimeBorrower", 80)}
                        answer={
                            <YesOrNoChoice
                                handleValueChange={handleValueChange}
                                name="firstTimeBorrower"
                                selectedValue={info["firstTimeBorrower"]}
                            />}
                    />
                </Route>
                <Route path={`${path}/amount`}>
                    <SlideTemplate
                        question="How much would you like to borrow?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/reference`, "loanAmount", 100)}
                        progress={3}
                        answer={
                            <InputQP
                                onChange={handleValueChange}
                                name="loanAmount"
                                value={info["loanAmount"]}
                            />}
                    />
                </Route>
                <Route path={`${path}/reference`}>
                    <SlideTemplate
                        question="Do you have good credit or references?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`/signup`, "reference", 100)}
                        progress={3}
                        answer={
                            <YesOrNoChoice
                                handleValueChange={handleValueChange}
                                name="reference"
                                selectedValue={info["reference"]}
                            />}
                    />
                </Route>
            </Switch>
        </>
    );
};

export default PreQualification;
