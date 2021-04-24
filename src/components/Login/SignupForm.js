import React from "react";
import {Form, Button} from "semantic-ui-react";
import { useDispatch } from 'react-redux'
import { updateUser } from "../appSlice"



const SignupForm = ({formData, setFormData, isHidden, setIsHidden, updateForm, setOpen}) => {
    const dispatch = useDispatch()
    // const user = useSelector ( state => state.app.user )

    const handleSignupSubmit = (event) => {
        event.preventDefault();
    
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((renderUser) => {
            if (renderUser.name) {
              dispatch(updateUser(renderUser));
              setFormData({
                name: "",
                password: "",
              });
            //   console.log(user)
              setIsHidden(!isHidden);
              setOpen(false)
              alert("Thank you for signing up!")

              
              
            //   history.push('/listings')
            } else {
              alert("Unable to create user");
            }
          });
      };

  return (
    <div>
      <Form onSubmit={handleSignupSubmit}>
        <h2>Sign Up Form</h2>
        <Form.Group widths="equal">
          <Form.Input
            label="Name"
            placeholder="Desired Name"
            name="name"
            value={formData.name}
            onChange={updateForm}
          />
          <Form.Input
            type = 'password'
            label="Password"
            placeholder="Desired Password"
            name="password"
            value={formData.password}
            onChange={updateForm}
          />
        </Form.Group>
        <>
        <Button type="submit">Sign up</Button>
        <Button onClick={()=>setIsHidden(!isHidden)}>Back To Login</Button>
        </>
      </Form>
    </div>
  );
};

export default SignupForm;
