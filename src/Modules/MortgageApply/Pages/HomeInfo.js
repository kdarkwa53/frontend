import Styles from "./HomeInfo.module.css"
import { Col, Steps } from "antd"
import SlideTemplate from "../../../Shared/Components/SlideTemplate"
import { Switch, Route } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';

import { CreditCard, Wallet, Loan, Transfer } from "../../../Shared/Components/JavIcons"

import ProductCard from "../../../Shared/Components/ProductCard"
import JavInput from "../../../Shared/Components/JavInput"


const ServiceTypeAnswers = () => {
    return (
        <>
            <ProductCard icon={<Loan width="100%" />} label="Loan" />
            <ProductCard icon={<Wallet width="100%" />} label="Savings" />
            <ProductCard icon={<CreditCard width="100%" />} label="Secure credit card" />
            <ProductCard icon={<Transfer width="100%" />} label="Send money" />
        </>
    )
}

const Slide1 = () => {
    return (
        <SlideTemplate
            prev="/slide1"
            next="slide2"
            question="Which product or service would you like?"
            progress={10}
            answer={<ServiceTypeAnswers />} />

    )
}

const Slide2 = () => {
    return (
        <Col xl={12} lg={12}>
            <JavInput placeholder="First Name" />
        </Col>
    )
}

const HomeInfo = () => {
    const { Step } = Steps;

    return (
        <>
            <div className={Styles.contentArea}>
                <aside className={Styles.javSider} style={{ height: "100vh", }}>
                    <div style={{ position: "fixed", display: "flex", justifyContent: "center", alignContent: "center", height: "60%", marginTop: "3em" }}>
                        <Steps direction="vertical" size="small" current={1}>
                            <Step title="Finished" description="This is a description." />
                            <Step title="In Progress" description="This is a description." />
                            <Step title="Waiting" description="This is a description." />
                            <Step title="In Progress" description="This is a description." />
                            <Step title="Waiting" description="This is a description." />
                        </Steps>
                    </div>
                </aside>
                <div className={Styles.questionArea}>
                    <Route
                        render={({ location }) => {
                            return (
                                <PageTransition
                                    preset="moveToLeftFromRight"
                                    transitionKey={location.pathname}
                                >
                                    <Switch location={location}>
                                        <Route exact path="/slide1" component={Slide1} />
                                        <Route exact path="/slide1" component={Slide2} />
                                    </Switch>
                                </PageTransition>
                            );
                        }}
                    />



                </div>
            </div>
        </>
    )
}

export default HomeInfo