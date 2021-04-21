import React from 'react'
import { Form, Checkbox, Header } from "semantic-ui-react";

const EditForm = ({edit, setEdit, formData, setFormData, updateForm, handleCheck, handleUpdate}) => {

    return (
        <div style={{ padding: "1em" }}>
          <Form onSubmit={(e) => handleUpdate(e)}>
          <Header as='h3' style={{ fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fontWeight: 700, color: 'white'}}> UPDATE LIST INFO </Header>
            <Form.Group>
              <Form.Input
                width={14}
                fluid
                name="name"
                placeholder="List Name"
                value={formData.name}
                onChange={updateForm}
              />
    
              <Checkbox
                style={{
                  height: "25px",
                  marginTop: "9px",
                  marginLeft: "1em",
                  fontSize: "16px",
                }}
                checked={!formData.public}
                // label="Private List"
                name="public"
                // value={formData.public}
                onChange={handleCheck}
              />
              <label style={{color: 'white', marginLeft: '1em', marginTop: '.5em', fontSize: '16px'}}>Private List</label>
            </Form.Group>
    
            <Form.TextArea
              name="description"
              placeholder="List Description"
              value={formData.description}
              onChange={updateForm}
            />
    
            <Form.Button color='black' type="submit">Update</Form.Button>
          </Form>
        </div>
      );
    };
export default EditForm
