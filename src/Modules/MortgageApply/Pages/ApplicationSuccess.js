

import React from "react";
import { useHistory } from "react-router-dom"
import "tabler-react/dist/Tabler.css";
import { Button, Result, Layout } from "antd";
import { Page } from "tabler-react";

// import { submitForPreview } from "../duck/act
const ApplicationSuccess = () => {
    const history = useHistory()
    const { Content } = Layout;

    return (
        <>
            <Page.Content >
                <Content
                    style={{
                        minHeight: 300,
                        padding: "50px",
                        margin: "1em",
                        backgroundColor: "white",
                    }}
                >
                    <Result
                        status="success"
                        title="Successfully Submitted Mortgage Application"
                        subTitle="Well done. You are s step closer to acquiring a mortgage for your dream home. Your application is crrently under review"
                        extra={[
                            <Button type="primary" key="console" onClick={() => history.push("/applications")}>
                                My Applications
                            </Button>,
                            <Button key="buy" onClick={() => history.push("/new-application")} >Start New Application</Button>,
                        ]}
                    />,
                </Content>
            </Page.Content>
        </>
    )
}

export default ApplicationSuccess