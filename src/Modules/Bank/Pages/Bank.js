import React from "react";

import "tabler-react/dist/Tabler.css";

import { Grid, Page, Icon } from "tabler-react";

import { Table } from "antd";

import MenuBar from "../../../Shared/Components/Menu";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Total Clients",
    dataIndex: "clients",
    key: "clients",
  },
  {
    title: "Loan Amount",
    dataIndex: "loan",
    key: "loan",
  },
  {
    title: "Action",
    key: "action",
    render: () => {
      return (
        <>
          <Link to="/bank-details">
            <Icon link name="eye" />
          </Link>
        </>
      );
    },
  },
];

const data = [
  {
    key: 1,
    name: "Ecobank Ghana",
    address: "Oxford Street",
    clients: "660",
    loan: "$1,160,000",
  },
  {
    key: 2,
    name: "Stanbic Ghana",
    address: "East Legon",
    clients: "360",
    loan: "$960,000",
  },
  {
    key: 3,
    name: "First National Bank",
    address: "Achimota",
    clients: "300",
    loan: "$160,000",
  },
];

const Bank = () => {
  return (
    <>
      <Page.Content title="Banks">
        <Grid.Row>
          <Grid.Col width={12}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 600 }}
            />
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </>
  );
};

export default Bank;
