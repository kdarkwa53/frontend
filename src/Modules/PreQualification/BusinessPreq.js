import React, { useState } from "react";
import "tabler-react/dist/Tabler.css";
import Direction from "../../Shared/Components/Direction"
import Styles from "./PreQualification.module.css"
import ProductCard from "../../Shared/Components/ProductCard"
import { Row, Input } from "antd"
import { ThumbsDown, ThumbsUp } from "../../Shared/Components/JavIcons"
import { useDispatch } from "react-redux"
import {
    showErrorNotification,
} from "../../Shared/actions/alert.actions";

import { useRouteMatch, Route, Switch, useHistory } from "react-router-dom"



const YesOrNoChoice = ({ handleValueChange, name, selectedValue }) => {
    return (
        <>
            <ProductCard onChange={handleValueChange} selectedValue={selectedValue} name={name} value="yes" icon={<ThumbsUp width="100%" />} label="Yes" />
            <ProductCard onChange={handleValueChange} selectedValue={selectedValue} name={name} value="no" icon={<ThumbsDown width="100%" />} label="No" />
        </>
    )
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
                <Row justify="center" align="middle" style={{ minWidth: "500px", marginTop: "3em" }} gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} >
                    {answer}
                </Row>
            </div>
            <div className={Styles.answerSection}>
            </div>
        </div>
    )
}



const BusinessPreq = () => {
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
        // setProgress(prog)
    }


    let { path } = useRouteMatch();

    // const [answered, setAnswered] = useState(false)
    const [info, setInfo] = useState({ loanAmount: "" })
    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.content}>
                    <div className={Styles.bar}>
                        {/* <ProgressBar size="sm" percentage={progress}></ProgressBar> */}
                    </div>
                </div>
            </div>

            <Switch>
                <Route exact path={path}>
                    <SlideTemplate
                        question="What is the legal name of your business?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/business-owner`, "businessName", 20)}

                        answer={
                            <Input size="large" value={info["businessName"]} name='businessName' onChange={handleValueChange} />
                        }
                    />
                </Route>
                <Route path={`${path}/business-owner`}>
                    <SlideTemplate
                        question="Who is the primary owner of the business?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/phone`, "owner", 30)}
                        answer={
                            <Input onChange={handleValueChange} size="large" value={info["owner"]} name='owner' />}
                    />
                </Route>
                <Route path={`${path}/phone`}>
                    <SlideTemplate
                        question="Please provide phone numbers for the business office and primary owner"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/address`, "phone", 50)}
                        answer={
                            <Input onChange={handleValueChange} size="large" value={info["phone"]} name='phone' />
                        }
                    />
                </Route>
                <Route path={`${path}/address`}>
                    <SlideTemplate
                        question="What’s the physical address of the business?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/business-type`, "cool", 65)}
                        answer={
                            <Input onChange={handleValueChange} size="large" value={info["cool"]} name='cool' />
                        }
                    />
                </Route>
                <Route path={`${path}/business-type`}>
                    <SlideTemplate
                        question="Is this an import or export trading businesses?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(
                            info["businessType"] === "yes" ? `${path}/products` : `${path}/other-business`
                            , "businessType", 80)}
                        answer={
                            <YesOrNoChoice
                                handleValueChange={handleValueChange}
                                name="businessType"
                                selectedValue={info["businessType"]}
                            />
                        }
                    />
                </Route>
                <Route path={`${path}/products`}>
                    <SlideTemplate
                        question="What product do you import or export?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`${path}/otherBusiness`, "products", 82)}
                        progress={3}
                        answer={
                            <Input onChange={handleValueChange} size="large" value={info["products"]} name='products' />}
                    />
                </Route>
                <Route path={`${path}/otherBusiness`}>
                    <SlideTemplate
                        question="What is the type of business?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`/javolin`, "otherBusiness", 85)}
                        progress={3}
                        answer={
                            <Input onChange={handleValueChange} size="large" value={info["otherBusiness"]} name='otherBusiness' />}
                    />
                </Route>

                <Route path={`${path}/businessYears`}>
                    <SlideTemplate
                        question="How many years have you been in this business??"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`/phone`, "businessYears", 86)}
                        progress={3}
                        answer={
                            <Input onChange={handleValueChange} size="large" value={info["businessYears"]} name='businessYears' />}
                    />
                </Route>
                <Route path={`${path}/javolin`}>
                    <SlideTemplate
                        question="What product or Service do you need from Javolin?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`/collateral`, "service", 87)}
                        progress={3}
                    // answer={
                    //     <YesOrNoChoice
                    //         handleValueChange={handleValueChange}
                    //         name="service"
                    //         selectedValue={info["service"]}
                    //     />}
                    />
                </Route>
                <Route path={`${path}/collateral`}>
                    <SlideTemplate
                        question="Do you have cash or other collateral for the loan?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`/bank-account`, "collateral", 89)}
                        progress={3}
                        answer={
                            <YesOrNoChoice
                                handleValueChange={handleValueChange}
                                name="collateral"
                                selectedValue={info["collateral"]}
                            />}
                    />
                </Route>
                <Route path={`${path}/loan`}>
                    <SlideTemplate
                        question="What size loan do you need?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`/bank-account`, "loanSize", 90)}
                        progress={3}
                        answer={
                            <Input onChange={handleValueChange} size="large" value={info["loanSize"]} name='loanSize' />}
                    />
                </Route>
                <Route path={`${path}/bank-account`}>
                    <SlideTemplate
                        question="Do you already have an established bank account with a current bank?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`/bank-name`, "bankAccount", 95)}
                        progress={3}
                        answer={
                            <YesOrNoChoice
                                handleValueChange={handleValueChange}
                                name="bankAccount"
                                selectedValue={info["bankAccount"]}
                            />}
                    />
                </Route>
                <Route path={`${path}/bank-name`}>
                    <SlideTemplate
                        question="Name of bank?"
                        prevLink={() => handleDirClick()}
                        nextLink={() => handleDirClick(`/business/dashboard`, "bankName", 100)}
                        progress={3}
                        answer={
                            < Input onChange={handleValueChange} size="large" value={info["bankName"]} name='bankName' />}
                    />
                </Route>
            </Switch>
        </>
    );
};

export default BusinessPreq;
