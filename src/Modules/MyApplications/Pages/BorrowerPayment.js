import React from "react";
import { Grid, Page, ContactCard, ProgressCard } from "tabler-react";
import ApplicationMenu from "./ApplicationMenu";

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

const BorrowerPayment = () => {
  return (
    <>
      <ApplicationMenu nav="payment" />
      <Page.Content title="Payment">
        <Grid.Row>
          <Grid.Col width={4}>
            <ContactCard
              cardTitle="Mortgage Summary"
              name={"Michael Assan"}
              details={[
                { title: "Loan Amount", content: "$150,000" },
                { title: "Interest Rate", content: "15%" },
                {
                  title: "Facility Fee",
                  content: "2%",
                },
                { title: "Years to Repay", content: "20" },
                { title: "Total Amount", content: "$215,000" },
                { title: "Required Deposit", content: "$15,000" },
                { title: "Monthy Installment", content: "$4,000" },
              ]}
              description={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.
   Consectetur dignissimos doloribus eum fugiat itaque
  laboriosam maiores nisi nostrum perspiciatis vero.`}
            />
          </Grid.Col>

          <Grid.Col width={8}>
            <Grid.Row>
              <Grid.Col sm={6}>
                <ProgressCard
                  header="Required Downpayment"
                  content="$15,000"
                  progressColor="green"
                  progressWidth={100}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <ProgressCard
                  header="Outstanding Payment"
                  content="$10500"
                  progressColor="orange"
                  progressWidth={80}
                />
              </Grid.Col>
            </Grid.Row>

            <Table columns={columns} dataSource={data} />
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </>
  );
};

export default BorrowerPayment;
