import { useState } from "react";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Login/SignupForm";

const LoginContainer = ({setOpen}) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const updateForm = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [key]: value });
    // console.log(formData)
  };

  const [isHidden, setIsHidden] = useState(true);

  return (
    <div style={{ border: "solid" }}>

    { isHidden ? 

      <LoginForm
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        formData={formData}
        setFormData={setFormData}
        updateForm={updateForm}
        setOpen={setOpen}
      />

      :
      
      <SignupForm
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        formData={formData}
        setFormData={setFormData}
        updateForm={updateForm}
        setOpen={setOpen}
      />

    }
    </div>
  );
};

export default LoginContainer;
