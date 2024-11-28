import { Button } from "react-bootstrap";

function CreateAccount() {
  return (
    <>
      <h1 className="title"><b>Connect</b></h1>
      
      <form className="create-account">
        <h2>Create Account</h2>

        <label>First Name</label>
        <br/>
        <input/>
        <br/>

        <label>Last Name</label>
        <br/>
        <input/>
        <br/>

        <label>email</label>
        <br/>
        <input/>
        <br/>

        <label>username</label>
        <br/>
        <input/>
        <br/>

        <label>password</label>
        <br/>
        <input/>
        <br/>
      </form>

      <Button className="submit-button" variant="dark">Submit</Button>
    </>
  );
}

export default CreateAccount;