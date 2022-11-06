import React from "react";

import "tabler-react/dist/Tabler.css";

import MenuBar from "../../Shared/Components/Menu";

import {
  Card,
  Container,
  Grid,
  StampCard,
  // colors,
  Table,
  Avatar,
  Icon,
  StatsCard,
  Page,
} from "tabler-react";

// import C3Chart from "react-c3js";

const DashboardPage = () => {
  return (
    <>
      <Page.Content title="Dashboard">
        <Container>
          <Grid.Row>
            <Grid.Col sm={6} lg={3}>
              <StampCard
                color="blue"
                icon="file"
                header={
                  <a href="/">
                    5000 <small>Total Applications</small>
                  </a>
                }
                footer={"3400 approved"}
              />
            </Grid.Col>
            <Grid.Col sm={6} lg={3}>
              <StampCard
                color="green"
                icon="dollar-sign"
                header={
                  <a href="/">
                    5 <small>Banks</small>
                  </a>
                }
                footer={"1 added today"}
              />
            </Grid.Col>
            <Grid.Col sm={6} lg={3}>
              <StampCard
                color="red"
                icon="users"
                header={
                  <a href="/">
                    1,352 <small>Borrowers</small>
                  </a>
                }
                footer={"163 registered today"}
              />
            </Grid.Col>
            <Grid.Col sm={6} lg={3}>
              <StampCard
                color="yellow"
                icon="user"
                header={
                  <a href="/">
                    5006 <small>Users</small>
                  </a>
                }
                footer={"3 deactivated"}
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col sm={12} lg={6}>
              <Card>
                <Card.Header>
                  <Card.Title>Defaulted</Card.Title>
                </Card.Header>
                <Card.Body>
                  {/* <C3Chart
                    style={{ height: "12rem" }}
                    data={{
                      columns: [
                        // each columns data
                        ["data1", 63],
                        ["data2", 37],
                      ],
                      type: "donut", // default type of chart
                      colors: {
                        data1: colors["green"],
                        data2: colors["green-light"],
                      },
                      names: {
                        // name of each serie
                        data1: "Maximum",
                        data2: "Minimum",
                      },
                    }}
                    legend={{
                      show: false, //hide legend
                    }}
                    padding={{
                      bottom: 0,
                      top: 0,
                    }}
                  /> */}
                </Card.Body>
              </Card>
            </Grid.Col>
            <Grid.Col lg={6}>
              <Card>
                <Card.Header>
                  <Card.Title>Recent transactions</Card.Title>
                </Card.Header>
                <Table
                  cards={true}
                  striped={true}
                  responsive={true}
                  className="table-vcenter"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.ColHeader colSpan={2}>User</Table.ColHeader>
                      <Table.ColHeader>Bank</Table.ColHeader>
                      <Table.ColHeader>Amount</Table.ColHeader>
                      <Table.ColHeader />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Col className="w-1">
                        <Avatar>RB</Avatar>
                      </Table.Col>
                      <Table.Col>Ronald Bradley</Table.Col>
                      <Table.Col>Ecobank Ghana</Table.Col>
                      <Table.Col className="text-nowrap">$600</Table.Col>
                      <Table.Col className="w-1">
                        <Icon link={true} name="eye" />
                      </Table.Col>
                    </Table.Row>
                    <Table.Row>
                      <Table.Col>
                        <Avatar>BM</Avatar>
                      </Table.Col>
                      <Table.Col>Russell Gibson</Table.Col>
                      <Table.Col>First National Bank</Table.Col>
                      <Table.Col className="text-nowrap">$700</Table.Col>
                      <Table.Col>
                        <Icon link={true} name="eye" />
                      </Table.Col>
                    </Table.Row>
                    <Table.Row>
                      <Table.Col>
                        <Avatar>BA</Avatar>
                      </Table.Col>
                      <Table.Col>Beverly Armstrong</Table.Col>
                      <Table.Col>Stanbic Bank</Table.Col>
                      <Table.Col className="text-nowrap">$500</Table.Col>
                      <Table.Col>
                        <Icon link={true} name="eye" />
                      </Table.Col>
                    </Table.Row>
                    <Table.Row>
                      <Table.Col>
                        <Avatar>BK</Avatar>
                      </Table.Col>
                      <Table.Col>Bobby Knight</Table.Col>
                      <Table.Col>Republic Bank</Table.Col>
                      <Table.Col className="text-nowrap">$400</Table.Col>
                      <Table.Col>
                        <Icon link={true} name="eye" />
                      </Table.Col>
                    </Table.Row>
                    <Table.Row>
                      <Table.Col>
                        <Avatar>SW</Avatar>
                      </Table.Col>
                      <Table.Col>Sharon Wells</Table.Col>
                      <Table.Col>Republic Bank</Table.Col>
                      <Table.Col className="text-nowrap">$900</Table.Col>
                      <Table.Col>
                        <Icon link={true} name="eye" />
                      </Table.Col>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Card>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col width={6} sm={4} lg={3}>
              <StatsCard
                layout={1}
                movement={6}
                total="$100,564,000"
                label="Total Loans"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={3}>
              <StatsCard
                layout={1}
                movement={3}
                total="$401,500"
                label="Total Paid"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={3}>
              <StatsCard
                layout={1}
                movement={0}
                total="15%"
                label="Average Interest Rate"
              />
            </Grid.Col>
            <Grid.Col width={6} sm={4} lg={3}>
              <StatsCard
                layout={1}
                movement={-3}
                total="$20,500"
                label="Total Defaulted"
              />
            </Grid.Col>
          </Grid.Row>
        </Container>
      </Page.Content>
    </>
  );
};

export default DashboardPage;
