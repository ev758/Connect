import django_api from "../django_api";

function ForgotPassword() {

  const forgotPassword = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //declarations
      const email = document.getElementById("email").value;
      const notification = document.getElementById("emailNotification");

      try {
        //sends POST request to email password reset link
        const response = await django_api.post("forgot-password/", {
          email: email
        });

        if (response.status === 200) {
          notification.textContent = "An email with a password reset link has been sent to your inbox.";
        }
        else {
          throw new Error("Invalid email address");
        }
      }
      catch (error) {
        notification.textContent = "Invalid email address, please enter your email.";
        notification.style.color = "red";
        console.error(error);
      }
    }
  }

  return (
    <>
      <form className="forgot-password" onKeyDown={forgotPassword}>
        <h2>Forgot Password</h2>

        <input id="email" placeholder="Enter your email"/>
        <br/>
      </form>

      <span id="emailNotification"></span>
    </>
  );
}

export default ForgotPassword;