import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import django_api from "../django_api.js";

function CreateAccount() {
  const navigate = useNavigate();

  const createAccount = async (event) => {
    event.preventDefault();

    try {
      //sends POST request to create an account
      const response = await django_api.post("create-account/", {
        first_name: event.target.firstName.value,
        last_name: event.target.lastName.value,
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value
      });

      if (response.status === 201) {
        navigate("/login");
      }
      else {
        throw new Error("Could not create account");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form className="create-account" id="createAccountForm" onSubmit={(event) => createAccount(event)}>
        <h2>Create Account</h2>

        {/* first name input */}
        <label htmlFor="firstName">First Name</label>
        <br/>
        <input type="text" id="firstName" name="firstName"/>
        <br/>

        {/* last name input */}
        <label htmlFor="lastName">Last Name</label>
        <br/>
        <input type="text" id="lastName" name="lastName"/>
        <br/>

        {/* email input */}
        <label htmlFor="email">email</label>
        <br/>
        <input type="email" id="email" name="email"/>
        <br/>

        {/* username input */}
        <label htmlFor="username">username</label>
        <br/>
        <input type="text" id="username" name="username"/>
        <br/>

        {/* password input */}
        <label htmlFor="password">password</label>
        <br/>
        <input type="password" id="password" name="password"/>
        <br/>
      </form>

      <Button className="submit-button" form="createAccountForm" as="input" type="submit" value="Submit" variant="dark"/>
    </>
  );
}

export default CreateAccount;