import { useNavigate, useParams } from "react-router";
import django_api from "../django_api";

function PasswordReset() {
  //declarations
  const navigate = useNavigate();
  const params = useParams();

  const passwordReset = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const password = document.getElementById("password").value;

      try {
        //sends POST request to reset password
        const response = await django_api.post("forgot-password/password-reset/", {
          password_reset_token: params.passwordReset,
          password: password
        });

        if (response.status === 200) {
          alert("Password reset, returning to login.");
          navigate("/login");
        }
        else {
          throw new Error("Invalid password");
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <form className="password-reset" onKeyDown={passwordReset}>
        <h2>Forgot Password</h2>

        <input id="password" placeholder="Enter new password"/>
        <br/>
      </form>
    </>
  );
}

export default PasswordReset;