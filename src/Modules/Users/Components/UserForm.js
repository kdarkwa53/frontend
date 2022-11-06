import React from "react"
import { Form, Grid} from "tabler-react"
const UserForm = () => {
    return(
        <>
        <Grid.Row>
            <Grid.Col lg={6} sm={14}>
                <Form.Group label="First Name?">
                    <Form.Input name="userFirstName" placeholder="Enter first Name" />
                </Form.Group>
            </Grid.Col>
            <Grid.Col lg={6} sm={12}>
                 <Form.Group label="Last Name?">
                    <Form.Input name="userLastName" placeholder="Enter last Name" />
                </Form.Group>
            </Grid.Col>
        </Grid.Row>
        <Grid.Row>
            <Grid.Col lg={6} sm={12}>
                <Form.Group label="Email?">
                    <Form.Input name="email" placeholder="Enter first Name" />
                </Form.Group>
            </Grid.Col>
            <Grid.Col lg={6} sm={12}>
                 <Form.Group label="Role">
                     <Form.Select>
                        <option>Bank</option>
                        <option>Admin</option>
                        <option>Borrower</option>
                     </Form.Select>
                </Form.Group>
            </Grid.Col>
        </Grid.Row>         
        </>
    )
}

export default UserForm