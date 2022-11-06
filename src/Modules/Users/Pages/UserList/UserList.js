import React from "react";

import "tabler-react/dist/Tabler.css";

import { Grid, Page, Button,  } from "tabler-react";

import { Table, Card } from "antd";
import EditUser from "../EditUser/EditUser"

// import { Link } from "react-router-dom";

import MenuBar from "../../../../Shared/Components/Menu";
import AddUser from "../AddUser/AddUser";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
            <EditUser/>
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
        name: "Kwabena Adu-Darkwa",
        email: "kwabena90@gmail.com",
        roleName: "Borrower"
    },
    {
        key: "2",
        name: "Abigail Asante",
        email: "abi@gmail.com",
        roleName: "Bank"
    },
    {
        key: "3",
        name: "David Beckamp",
        email: "davidb@gmail.com",
        roleName: "Javolin Admin"
    },
];


const UserList = () => {
  return (
    <>
      <MenuBar/>
      <Page.Content title="Role List">
        <Grid.Row>
          <Grid.Col width={12}>
            <Card>
                <AddUser/>
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

export default UserList;
