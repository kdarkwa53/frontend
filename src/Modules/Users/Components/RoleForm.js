import React from "react"
import { Form} from "tabler-react"
const RoleForm = () => {
    return(
        <>
        
            <Form.Group label="Name of Role?">
                <Form.Input name="roleName" placeholder="Enter Role Name" />
            </Form.Group>
            <Form.Group label="Which of the following applies to you?">
                <Form.Checkbox
                isInline
                label="Edit Profile"
                name="employee"
                />
                <Form.Checkbox
                isInline
                label="Submit Mortgage"
                name="submitMortage"
                />
                 <Form.Checkbox
                isInline
                label="View Profile"
                name="viewProf"
                />
                <Form.Checkbox
                isInline
                label="Edit Mortgage"
                name="sEditMortage"
                />
                 <Form.Checkbox
                isInline
                label="View Dashboard"
                name="viewDash"
                />
                <Form.Checkbox
                isInline
                label="Add User"
                name="AddUser"
                />
            </Form.Group>
         
        </>
    )
}

export default RoleForm