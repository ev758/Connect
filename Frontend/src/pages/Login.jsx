import { Link, useNavigate } from "react-router";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../jwt_tokens.js";
import django_api from "../django_api.js";

function Login() {
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();

    if (event.key === "Enter") {
      //declarations
      const emailUsername = document.getElementById("emailUsername").value;
      const password = document.getElementById("password").value;
      
      try {
        //if email is entered, send POST request with email and password
        if (emailUsername.includes("@")) {
          //sends POST request for access and refresh token
          const response = await django_api.post("tokens/", {
            email: emailUsername,
            password: password
          });

          if (response.status === 200) {
            //sets access and refresh token in local storage
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            navigate("/");
          }
          else {
            throw new Error("User account does not exist");
          }
        }
        //if username is entered, send POST request with username and password
        else {
          //sends POST request for access and refresh token
          const response = await django_api.post("tokens/", {
            username: emailUsername,
            password: password
          });

          if (response.status === 200) {
            //sets access and refresh token in local storage
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            navigate("/");
          }
          else {
            throw new Error("User account does not exist");
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  
  return (
    <>
      <form className="login" onKeyDown={(event) => login(event)}>
        <h2>Login</h2>

        {/* email/username input */}
        <input placeholder="Enter email or username" type="text" id="emailUsername" name="emailUsername"/>
        <br/>

        {/* password input */}
        <input placeholder="Enter password" type="password" id="password" name="password"/>
        <br/>

        <nav>
          <Link to="create-account">Create an account</Link>
          <span>|</span>
          <Link to="forgot-password">Forgot password</Link>
        </nav>
      </form>
    </>
  );
}

export default Login;