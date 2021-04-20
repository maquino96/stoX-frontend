import React from "react";
import { Form, Container, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateBatchWatchlist } from "../appSlice";

const LoginForm = ({
  isHidden,
  setIsHidden,
  formData,
  setFormData,
  updateForm,
  setOpen
}) => {
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((loginUser) => {
        if (loginUser.name) {
          fetch(
            `${process.env.REACT_APP_BACKEND_URL}/batch/${loginUser.watchlists[
              user.loadwatchlist
            ].arrayList.join(",")}`
          )
            .then((r) => r.json())
            .then((data) => {
              dispatch(updateBatchWatchlist(data));
            });
          dispatch(updateUser(loginUser));
          setFormData({ name: "", password: "" })
          setOpen(false)
        } else {
          alert("Username or Password is incorrect");
        }
      });
  };

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   const defaultUser = {
  //     name: "Guest",
  //     id: 1,
  //     loadwatchlist: "Default",
  //     watchlists: { Default: { id: 999, arrayList: ["SPY", "DIA"] } },
  //   };

  //   dispatch(updateUser(defaultUser));

  //   fetch(
  //     `${process.env.REACT_APP_BACKEND_URL}/batch/${defaultUser.watchlists[
  //       user.loadwatchlist
  //     ].arrayList.join(",")}`
  //   )
  //     .then((r) => r.json())
  //     .then((data) => {
  //       console.log(data);
  //       dispatch(updateBatchWatchlist(data));
  //     });
  // };

  return (
    <div style={{ padding: "1em" }}>
      <Form onSubmit={handleLoginSubmit} id="login-form" className="hidden">
        <Container>
          {/* {user.name === "Guest" ? ( */}
            <>
              <h2>Login</h2>
              <Form.Group widths="equal">
                <Form.Input
                  label="Name"
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  onChange={updateForm}
                />
                <Form.Input
                  type="password"
                  label="Password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={updateForm}
                />
              </Form.Group>

              <>
                <Button type="submit"> Login </Button>
                <Button onClick={() => setIsHidden(!isHidden)}>
                  {" "}
                  Sign up{" "}
                </Button>
              </>
            </>
          {/* ) : ( */}
            {/* <Button onClick={(e) => handleLogout(e)}>Logout</Button> */}
          {/* )} */}
        </Container>
      </Form>
    </div>
  );
};

export default LoginForm;
