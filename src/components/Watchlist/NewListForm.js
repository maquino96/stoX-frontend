import React from "react";
import { Form, Checkbox, Header } from "semantic-ui-react";

const NewListForm = ({edit, setEdit, formData, setFormData, updateForm, handleCheck, handleSubmit}) => {

  return (
    <div style={{ padding: "1em" }}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Header as='h3' style={{ fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fontWeight: 700, color: 'white'}}> NEW LIST FORM </Header>
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
            // label="Private List"
            name="public"
            checked={!formData.public}
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

        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    </div>
  );
};

export default NewListForm;
