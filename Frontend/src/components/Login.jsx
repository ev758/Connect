import { Link } from "react-router";

function Login() {
  return (
    <>
      <h1 className="title"><b>Connect</b></h1>
      
      <form className="login">
        <h2>Login</h2>

        <input placeholder="Enter email or username"/>
        <br/>

        <input placeholder="Enter password"/>
        <br/>

        <nav>
          <Link to="/create-account">Create an account</Link>
          <span>|</span>
          <Link to="/forgot-password">Forgot password</Link>
        </nav>
      </form>
    </>
  );
}

export default Login;