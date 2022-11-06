import React from "react";

import "tabler-react/dist/Tabler.css";

import { Grid, Page, Button, } from "tabler-react";

import { Table, Card } from "antd";
import EditRole from "../EditRole/EditRole"

// import { Link } from "react-router-dom";

import MenuBar from "../../../../Shared/Components/Menu";
import AddRole from "../AddRole/AddRole";

const columns = [
  {
    title: "id",
    dataIndex: "roleId",
    key: "roleId",
  },
  {
    title: "Role Name",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "Action",
    key: "action",
    render: () => {

      return (
        <>
          <div className="dropdown">
            <EditRole />
            <Button outline color="success" size="sm">View</Button>
            <Button outline color="danger" size="sm">Delete</Button>
          </div>
        </>
      );
    },
  },
];

const data = [
  {
    key: "1",
    roleId: "1",
    roleName: "Borrower"
  },
  {
    key: "2",
    roleId: "2",
    roleName: "Bank"
  },
  {
    key: "3",
    roleId: "3",
    roleName: "Javolin Admin"
  },
];


const RoleList = () => {
  return (
    <>
      <Page.Content title="Role List">
        <Grid.Row>
          <Grid.Col width={12}>
            <Card>
              <AddRole />
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 600 }}
              />
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </>
  );
};

export default RoleList;
