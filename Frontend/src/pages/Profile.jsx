import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import ProfileImage from "../assets/profile.jpg";
import django_api from "../django_api.js";

function Profile() {
  //declarations
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      //sends GET request to get profile
      const response = await django_api.get("profile/");

      if (response.status === 200) {
        setProfile(response.data);
      }
      else {
        throw new Error("Could not get profile");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const updateProfile = async (event) => {
    event.preventDefault();
    //declarations
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      //sends POST request to update profile
      const response = await django_api.post("profile/update/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password
      });

      if (response.status === 200) {
        window.location.reload();
      }
      else {
        throw new Error("Could not update profile");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const deleteProfile = async () => {
    try {
      //sends DELETE request to delete an account
      const response = await django_api.delete("profile/delete/");

      if (response.status === 204) {
        localStorage.clear();
        navigate("/login");
      }
      else {
        throw new Error("Could not delete account");
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      <div>
        <h1 className="title"><b>Connect</b></h1>
        <img className="profile-image" src={ProfileImage} alt="Profile Image"/>

        {(profile.last_name !== null) ?
          //if last name is not null, display first and last name
          <div>
            <h2>{profile.first_name} {profile.last_name}</h2>
            <h2>{profile.email}</h2>
            <br/>
            <br/>
          </div>
          :
          //if last name is null, display first name
          <div>
            <h2>{profile.first_name}</h2>
            <h2>{profile.email}</h2>
            <br/>
            <br/>
          </div>
        }

        <form className="profile-form" id="profileForm">
          <br/>
          {/* first name input */}
          <label htmlFor="firstName">First Name</label>
          <br/>
          <input type="text" id="firstName" name="firstName" defaultValue={profile.first_name}/>
          <br/>

          {/* last name input */}
          <label htmlFor="lastName">Last Name</label>
          <br/>
          <input type="text" id="lastName" name="lastName" defaultValue={profile.last_name}/>
          <br/>

          {/* email input */}
          <label htmlFor="email">email</label>
          <br/>
          <input type="email" id="email" name="email" defaultValue={profile.email}/>
          <br/>

          {/* username input */}
          <label htmlFor="username">username</label>
          <br/>
          <input type="text" id="username" name="username" defaultValue={profile.username}/>
          <br/>

          {/* password input */}
          <label htmlFor="password">password</label>
          <br/>
          <input type="password" id="password" name="password"/>
          <br/>

          <div>
            <Button className="authentication-button" variant="dark">Activate Two-Factor Authentication</Button>
            <Button className="save-changes-button" onClick={(event) => {updateProfile(event)}} variant="dark">Save Changes</Button>
          </div>

          <Button className="delete-account-button" onClick={() => {
            const input = window.prompt("Do you want to delete your account? " +
              "The account, friends list, and messages will be deleted and cannot be recovered. " +
              "Enter Yes for account deletion.");
            
            if (input.trim().toLowerCase() === "yes") {
              deleteProfile();
            }
          }} variant="danger">Delete Account</Button>
        </form>
      </div>
    </>
  );
}

export default Profile;