import React from "react";

import "tabler-react/dist/Tabler.css";

import { Grid, Page } from "tabler-react";
import { statusColor, sortListByDate } from "../../../helpers/utils"


import { Table, Tag, Empty, Button, Layout } from "antd";

import { EyeOutlined } from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";
import ProgressBar from "../../../Shared/Components/ProgressBar";
import { useSelector } from "react-redux"
const columns = [
  {
    title: "Application ID",
    dataIndex: "id",
    key: "id",

  },
  // {
  //   title: "Service Type",
  //   dataIndex: "service_type",
  //   key: "service_type",
  // },
  {
    title: "Progress",
    key: "progress",
    render: ({ progress }) => {
      return <ProgressBar size="xs" percentage={100}></ProgressBar>;
    },
    responsive:['lg']
  },
  {
    title: "Status",
    key: "status",
    render: ({ status }) => {
      return (
        <Tag color={statusColor(status)} key={status}>
          {status}
        </Tag>
      );
    },
    ellipsis: true
  },
  {
    title: "Date",
    key: "created_at",
    dataIndex: "created_at",
    responsive: ['lg']
    
  },
  {
    title: "Action",
    key: "action",
    render: ({ action }) => {
      return (
        // <>
        // {status === "100" ? (
        <Link to={`/preview/${action}`}>
          <EyeOutlined />
        </Link>
        
      );
    },
  },
];



const MyApplications = () => {
  const { Content } = Layout

  const appData = useSelector((state) => state?.submittedApplications?.entities);
  const history = useHistory()

  let data = appData?.applications
    ? Object.values(appData?.applications).map((application) => {
      return {
        key: application.id,
        id: application.reference,
        // service_type: application.service_type,
        progress: application.progress,
        status: application.status,
        action: application.id,
        created_at: new Date(application.created_at).toLocaleString('en-ZA') 
      };
    })
    : [];
  data = sortListByDate(data)
  return (
    <>
      <Page.Content title="My Applications">
        <Content
          style={{
            minHeight: 300,
            padding: "50px",
            margin: "1em",
            backgroundColor: "white",
          }}
        >
          <Grid.Row>
            <Grid.Col width={12}>
              {!appData?.applications ? (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                  }}
                  description={
                    <span>
                      You have no applications currrently
                    </span>
                  }
                >
                  <Button type="primary" onClick={() => history.push("/loans")} >Apply for a loan</Button>
                </Empty>
              ) : (
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 50 }}
                  scroll={{ y: 600 }}


                />
              )}

            </Grid.Col>
          </Grid.Row>
        </Content>
      </Page.Content>
    </>
  );
};

export default MyApplications;
