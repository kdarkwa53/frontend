import React from "react";

import "tabler-react/dist/Tabler.css";

import { Grid, Page, Button } from "tabler-react";

import { Table, Menu, Dropdown } from "antd";

import { Link } from "react-router-dom";

import MenuBar from "../../../../Shared/Components/Menu";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
  },
  {
    title: "",
    key: "action",
    render: () => {
      const menu = (
        <Menu>
          <Menu.Item>
            <Link to={"/preview"}>
              <li type="primary">view application</li>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <li type="primary">preapprove</li>
          </Menu.Item>
        </Menu>
      );
      return (
        <>
          <div className="dropdown">
            <Dropdown overlay={menu} trigger="onclick" placement="bottomRight">
              <Button color="secondary" size="sm" isDropdownToggle>
                Actions
              </Button>
            </Dropdown>
          </div>
        </>
      );
    },
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward Mintah ${i}`,
    amount: i + 500,
    status: "Pending review",
  });
}

const MortgageApplicationListPage = () => {
  return (
    <>
      <Page.Content title="Mortgage Applications">
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

export default MortgageApplicationListPage;
