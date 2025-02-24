import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useLocation } from "react-router";
import MessagesList from "../components/MessagesList.jsx";
import Conversation from "../components/Conversation.jsx";
import getProfile from "../utils/get_profile.js";
import getMessages from "../utils/get_messages.js";

function Messages() {
  //declarations
  const [profile, setProfile] = useState([]);
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const [friendStatus, setFriendStatus] = useState((location.state === null) ? [] : location.state.friendStatus);
  const friendName = (location.state === null) ? "" : location.state.friendName;

  useEffect(() => {
    getProfile(setProfile);
    getMessages(setMessages, friendStatus.friend_id);
  }, []);

  //websocket connects to server for messages
  const webSocketSendMessage = new WebSocket(`ws://127.0.0.1:8000/ws/send-message/${friendStatus.friend_id}/`);
    
  webSocketSendMessage.onopen = () => {
    console.log("Websocket connection established");
  }

  return (
    <>
      <div
        onMouseOut={() => {
          //receives message
          webSocketSendMessage.onmessage = (event) => {
            //declarations
            const data = JSON.parse(event.data);
            const date = new Date();
            const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            
            //if id is equal to user's id, add user-message to the nested div as its class and display message
            if (data.id === profile.id) {
              document.getElementById("textMessages").innerHTML += (
                `<div>
                  <div class="user-message">
                    <p class="text">
                      ${data.message}
                      <br/>
                      <label class="date">${currentDate}</label>
                    </p>
                  </div>
                </div>`
              );
            }
            //if id is not equal to user's id, add friend-text-message to the nested div as its class and display message
            else {
              document.getElementById("textMessages").innerHTML += (
                `<div>
                  <div class="friend-text-message">
                    <p class="text">
                      ${data.message}
                      <br/>
                      <label class="date">${currentDate}</label>
                    </p>
                  </div>
                </div>`
              );
            }
          }
        }}
        onMouseOver={() => {
          //receives message
          webSocketSendMessage.onmessage = (event) => {
            //declarations
            const data = JSON.parse(event.data);
            const date = new Date();
            const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

            //if id is equal to user's id, add user-message to the nested div as its class and display message
            if (data.id === profile.id) {
              document.getElementById("textMessages").innerHTML += (
                `<div>
                  <div class="user-message">
                    <p class="text">
                      ${data.message}
                      <br/>
                      <label class="date">${currentDate}</label>
                    </p>
                  </div>
                </div>`
              );
            }
            //if id is not equal to user's id, add friend-text-message to the nested div as its class and display message
            else {
              document.getElementById("textMessages").innerHTML += (
                `<div>
                  <div class="friend-text-message">
                    <p class="text">
                      ${data.message}
                      <br/>
                      <label class="date">${currentDate}</label>
                    </p>
                  </div>
                </div>`
              );
            }
          }
        }}
      >
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

        <div className="messages-conversation">
          <MessagesList
            profileId={profile.id}
            friendStatus={friendStatus}
            setFriendStatus={setFriendStatus}
            setMessages={setMessages}
          />

          <Conversation
            profileId={profile.id}
            friendName={friendName}
            friendStatus={friendStatus}
            messages={messages}
            webSocketSendMessage={webSocketSendMessage}
          />
        </div>
      </div>
    </>
  );
}

export default Messages;