import { useState } from "react";
import { Form, Checkbox } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../appSlice'

const NewListForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.app.user);

  const [formData, setFormData] = useState({
    user_id: user.id,
    name: "",
    public: true,
    description: "",
  });

  const updateForm = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [key]: value });
  };

  const handleCheck = (e) => {
      e.preventDefault()
      setFormData({...formData, public: !formData.public})
      console.log(formData.public)

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/newlist/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then( r => r.json())
      .then( userRender => { dispatch(updateUser(userRender)) })    


    alert(`Your list: ${formData.name} has been created`)
    setFormData({
        user_id: user.id,
        name: "",
        public: true,
        description: "",
      })


  };

  const options = [
    { key: "t", text: "Public", value: true },
    { key: "f", text: "Private", value: false },
  ];
  return (
    <div style={{ padding: "1em" }}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Input
            width={14}
            fluid
            label="List Name"
            name="name"
            placeholder="List Name"
            value={formData.name}
            onChange={updateForm}
          />

           <Checkbox style={{height:'25px', marginTop: '32px', marginLeft: '1em', fontSize: '16px'}}
            label='Private List'
            name='public'
            value={formData.public}
            onChange={updateForm}    />

        
        </Form.Group>

        <Form.TextArea
          label="About"
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
