import { useState, useEffect } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import SearchBar from "../components/SearchBar.jsx";
import FriendsList from "../components/FriendsList.jsx";
import django_api from "../django_api.js";
import getProfile from "../utils/get_profile.js";
import ProfileImage from "../assets/profile.jpg";

function Friends() {
  //declarations
  const [addFriendModal, setAddFriendModal] = useState(false);
  const closeAddFriendModal = () => setAddFriendModal(false);
  const displayAddFriendModal = () => setAddFriendModal(true);
  const [profile, setProfile] = useState([]);
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
      getProfile(setProfile);
  }, []);

  const friendRequest = async (userId, friendRequest) => {
    //declarations
    const webSocketURL = new WebSocket(`ws://127.0.0.1:8000/ws/friend-request/${userId}/`);
    const friendRequestBtn = document.getElementById(friendRequest);
    
    try {
      //sends POST request to create a friend request
      const response = await django_api.post(`friend-request/add-friend/${userId}/`, {
        friend_status: false,
        blocked: false,
        pending: true,
      });

      if (response.status === 201) {
        friendRequestBtn.style.backgroundColor = "green";
        friendRequestBtn.textContent = "check";

        //sends friend request notification to server
        webSocketURL.send(JSON.stringify({
          "notification": "You received a friend request from " + profile.first_name + " " + profile.last_name
        }));
      }
      else {
        throw new Error("Could not send friend request");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="page-border">
        <h1 className="title-header"><b>Connect</b></h1>

        <Dropdown>
          <Dropdown.Toggle className="material-icons profile" variant="light">
            person
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
            <Dropdown.Item href="/login" onClick={() => {localStorage.clear()}}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <h3 className="friends-title">Friends</h3>
      <SearchBar setName={setName} searchBarId={"searchFriends"}/>

      <div className="add-friend">
        <Button className="material-icons" onClick={displayAddFriendModal} variant="dark">person_add</Button>

        {/* displays add friend modal */}
        <Modal show={addFriendModal} onHide={closeAddFriendModal} scrollable={true}>
          <Modal.Body>
            <h3>Add Friend</h3>
            <SearchBar setUserList={setUserList} searchBarId={"searchUserList"}/>

            {
              //displays users by name dynamically
              userList.map(user => 
                <div className="user-container" key={user.id}>
                  <img className="user-profile-image" src={ProfileImage} alt="Profile image"/>
                  <label className="friends-list-name" id={"user" + user.id}>{user.first_name} {user.last_name}</label>
                  <Button
                    className="material-icons friend-request-button"
                    id={"friendRequest" + user.id}
                    onClick={() => friendRequest(user.id, "friendRequest" + user.id)}
                    variant="dark"
                  >
                    person_add
                  </Button>
                </div>
              )
            }
          </Modal.Body>
        </Modal>
      </div>
      <hr/>

      <FriendsList name={name}/>
    </>
  );
}

export default Friends;