import { useState, useEffect } from "react";
import { Alert, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import getProfile from "../utils/get_profile.js";
import getLatestMessages from "../utils/get_latest_messages.js";
import getFriendNames from "../utils/get_friend_names.js";
import getFriendStatus from "../utils/get_friend_status.js";
import ProfileImage from "../assets/profile.jpg";

function Home() {
  //declarations
  const [friendRequest, setFriendRequest] = useState(false);
  const [notification, setNotification] = useState("");
  const [profile, setProfile] = useState([]);
  const [latestMessages, setLatestMessages] = useState([]);
  const [friendNames, setFriendNames] = useState([]);
  const [friendStatus, setFriendStatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile(setProfile);
    getLatestMessages(setLatestMessages);
    getFriendNames(setFriendNames);
  }, []);

  //websocket connects to server for friend request notification
  const webSocketFriendRequest = new WebSocket(`ws://${import.meta.env.VITE_HOST}/ws/friend-request/${profile.id}/`);

  webSocketFriendRequest.onopen = () => {
    console.log("Websocket connection established");
  }

  //receives friend request notification
  webSocketFriendRequest.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setNotification(data.notification);
    setFriendRequest(true);
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

      {/* displays friend request notification */}
      <Alert show={friendRequest} onClose={() => setFriendRequest(false)} variant="info" dismissible>
        <h3>{notification}</h3>
      </Alert>

      <div className="friends-messages-tab">
        <h3><Link to="/friends">Friends</Link></h3>
        <h3><Link to="/messages">Messages</Link></h3>
      </div>
      <hr/>

      {
        //displays friend messages dynamically
        friendNames?.map((friendName, index) => 
          <div
            className="user-container"
            key={friendName.id}
            onMouseEnter={() => {
              getFriendStatus(setFriendStatus, profile.id, friendName.id);
            }}
            onClick={() => {
              navigate("/messages", {
                state: {
                    friendStatus: friendStatus,
                    friendName: friendName.first_name + " " + friendName.last_name
                }
              });
            }}
          >
            <img className="user-profile-image" src={ProfileImage} alt="Profile image"/>
            <label className="friend-name">{friendName.first_name} {friendName.last_name}</label>
            <label className="friend-message-date">{latestMessages[index].date}</label>
            <br/>
            <br/>
            <label className="friend-message">{latestMessages[index].friend_message}</label>
          </div>
        )
      }
    </>
  );
}

export default Home;