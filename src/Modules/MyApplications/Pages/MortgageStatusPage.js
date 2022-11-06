import React, { useEffect } from "react";

import "tabler-react/dist/Tabler.css";
import { Timeline, Layout, Card, Table, Tabs, Tag, ConfigProvider } from "antd";
import { FrownOutlined } from '@ant-design/icons';

import { Page, Grid } from "tabler-react";
import ApplicationMenu from "./ApplicationMenu";
import { useDispatch, useSelector } from "react-redux"

import ApproveResponse from "./ApproveResponse";
import { statusColor } from "../../../helpers/utils"
import { getProgress } from "../duck/action";


const { Content } = Layout;

const columns = [
  {
    title: "Bank",
    dataIndex: "bank",
    key: "bank",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      return (
        <Tag color={statusColor(status)} key={status}>
          {status}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: ({ action }) => {
      return (
        <>
          {/* <Link to="/preview"> */}
          <ApproveResponse approveDetails={action} />
          {/* </Link> */}
        </>
      );
    },
  },
];


const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <FrownOutlined style={{ fontSize: 40 }} />
    <p>Not Bank Pre-Approval Yet</p>
  </div>
);


// const TimelineItem = ({ text, item }) => {
//   console.log("hey: ", item)
//   return (
//     (item ? (
//       <Timeline.Item color="green">
//         {`${text} ${item}`}
//       </Timeline.Item>
//     ) : (""))
//   )
// }
const MortgageStatusPage = (props) => {
  const { id } = props.match.params;
  const submittedApplications = useSelector((state) => state?.submittedApplications?.entities)
  const applications = submittedApplications?.applications
  const applicationDetails = applications[id]
  const dispatch = useDispatch()

  const applicationProgress = useSelector((state) => state?.acceptMortgage?.applicationProgress)
  

  useEffect(()=>{
    dispatch(getProgress(id)) 
  },[id, dispatch])

  const data = applicationDetails?.pre_approvals
    ? Object.values(applicationDetails.pre_approvals).map((val) => {
      return {
        key: val.id,
        bank: val?.bank?.name,
        status: val.status,
        action: val
      };
    })
    : [];


  const progressApp = applicationProgress? applicationProgress[id] : {}
  const progress = progressApp ? Object.values(progressApp) : []
  const { TabPane } = Tabs;
  return (
    <>
      <ApplicationMenu nav="status" applicationId={id} />
      <Page.Content title="Status">
        <Content
          style={{
            minHeight: 300,
            padding: "50px",
            margin: "1em",
            backgroundColor: "white",
          }}
        >
          <Grid.Row>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Application Status" key="1">
                <Card >
                  <ConfigProvider renderEmpty={customizeRenderEmpty}>
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={{ pageSize: 50 }}
                      scroll={{ y: 600 }}
                    />
                  </ConfigProvider>
                </Card>
              </TabPane>
              <TabPane tab="Progress" key="2">
                <Timeline>
                  {
                    progress?.map((prog)=>{
                      let date = new Date(prog?.created_at).toLocaleString('en-GB', { timeZone: 'UTC' })
                      let status = (prog?.status)?.replaceAll("_", " ")
                      return(
                        <Timeline.Item key={prog?.id} color="green">
                          {`${status} on ${date}`}
                        </Timeline.Item>
                      )
                    })
                  }
                  
                </Timeline>
              </TabPane>
            </Tabs>
          </Grid.Row>
        </Content>
      </Page.Content>
    </>
  );
};

export default MortgageStatusPage;
