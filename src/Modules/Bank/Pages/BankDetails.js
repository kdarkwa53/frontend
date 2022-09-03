import MenuBar from "../../../Shared/Components/Menu";
import React from "react";
import { Grid, Page, StampCard, ContactCard, ProgressCard } from "tabler-react";

import { Table, Tag } from "antd";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Payment Method",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      if (status) {
        let color = status === "good standing" ? "green" : "red";
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      }
    },
  },
];

const data = [
  {
    key: 1,
    date: "January 2020",
    method: "card",
    amount: "$4000",
    status: "good standing",
    children: [
      {
        key: 11,
        date: "January 10",
        method: "card",
        amount: "$1000",
      },
      {
        key: 12,
        date: "January 19",
        method: "card",
        amount: "$1500",
      },
      {
        key: 13,
        date: "January 19",
        method: "card",
        amount: "$1500",
      },
    ],
  },
  {
    key: 2,
    date: "February 2020",
    method: "card",
    amount: "$3500",
    status: "defaulted",
    children: [
      {
        key: 21,
        date: "February 10",
        method: "card",
        amount: "$1000",
      },
      {
        key: 22,
        date: "February 15",
        method: "card",
        amount: "$1000",
      },
      {
        key: 23,
        date: "February 22",
        method: "card",
        amount: "$500",
      },
      {
        key: 23,
        date: "February 28",
        method: "Mobile Money",
        amount: "$1000",
      },
    ],
  },
  {
    key: 3,
    date: "March 2020",
    method: "card",
    amount: "$4000",
    status: "good standing",
    children: [
      {
        key: 31,
        date: "March 10",
        method: "card",
        amount: "$1000",
      },
      {
        key: 32,
        date: "March 19",
        method: "card",
        amount: "$1500",
      },
      {
        key: 33,
        date: "March 19",
        method: "card",
        amount: "$1500",
      },
    ],
  },
  {
    key: 4,
    date: "April 2020",
    method: "card",
    amount: "$4000",
    status: "good standing",
    children: [
      {
        key: 41,
        date: "April 10",
        method: "card",
        amount: "$1000",
      },
      {
        key: 42,
        date: "April 19",
        method: "card",
        amount: "$1500",
      },
      {
        key: 43,
        date: "April 19",
        method: "card",
        amount: "$1500",
      },
    ],
  },
];

const BankDetails = () => {
  return (
    <>
      <Page.Content title="Bank Details">
        <Grid.Row>
          <Grid.Col width={4}>
            <ContactCard
              cardTitle="Ecobank Ghana"
              //   name={"Ecobank Ghana"}
              details={[
                { title: "Location", content: "2, Morroco Road" },
                { title: "Date Joined", content: "Feb, 6, 2021" },
                { title: "Max Loan Amount", content: "$1,000,000" },
                { title: "Interest Rate", content: "12% - 15%" },
                {
                  title: "Facility Fee",
                  content: "2%",
                },
                { title: "Years to Repay", content: "20" },
              ]}
              description={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.
   Consectetur dignissimos doloribus eum fugiat itaque
  laboriosam maiores nisi nostrum perspiciatis vero.`}
            />
          </Grid.Col>
          <Grid.Col width={8}>
            <Grid.Row>
              <Grid.Col sm={6} lg={4}>
                <StampCard
                  color="blue"
                  icon="file"
                  header={
                    <a href="/">
                      500 <small>Total Applications</small>
                    </a>
                  }
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={4}>
                <StampCard
                  color="green"
                  icon="user"
                  header={
                    <a href="/">
                      300 <small>Number Approved</small>
                    </a>
                  }
                  footer={"1 added today"}
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={4}>
                <StampCard
                  color="red"
                  icon="cancel"
                  header={
                    <a href="/">
                      200 <small>Decline</small>
                    </a>
                  }
                  footer={"163 registered today"}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col width={12}>
                <Grid.Row>
                  <Grid.Col sm={6} lg={12}>
                    <ProgressCard
                      header="Total Loan Amount"
                      content="$7,550,000"
                      progressColor="green"
                    //   progressWidth={100}
                    />
                  </Grid.Col>
                  <Grid.Col sm={6} lg={12}>
                    <ProgressCard
                      header="Payment Received"
                      content="$400,500"
                      progressColor="orange"
                    //   progressWidth={80}
                    />
                  </Grid.Col>
                </Grid.Row>
              </Grid.Col>
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col width={12}>
            <Table columns={columns} dataSource={data} />
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </>
  );
};

export default BankDetails;
