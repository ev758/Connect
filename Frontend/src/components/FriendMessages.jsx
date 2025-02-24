import { useState, useEffect } from "react";
import getLatestMessages from "../utils/get_latest_messages.js";
import getFriendNames from "../utils/get_friend_names.js";
import getFriendStatus from "../utils/get_friend_status.js";
import getMessages from "../utils/get_messages.js";
import ProfileImage from "../assets/profile.jpg";

function FriendMessages({profileId, name, friendStatus, setFriendStatus, setMessages}) {
  //declarations
  const [friendNames, setFriendNames] = useState([]);
  const [latestMessages, setLatestMessages] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getLatestMessages(setLatestMessages);
    getFriendNames(setFriendNames);
  }, []);
  
  return (
    <>
      <hr/>
      {
        //if name input is empty, display all friend messages dynamically
        (name === "") ?
          friendNames?.map((friendName, index) => 
            <div className="user-container" key={friendName.id} onClick={() => {
              document.querySelector(".friend-name-conversation").textContent = friendName.first_name + " " + friendName.last_name;
              getFriendStatus(setFriendStatus, profileId, friendName.id);
              setCount(count + 1);

              if (count === 2) {
                getMessages(setMessages, friendStatus.friend_id);
                setCount(count - 1);
              }
            }}>
              <img className="user-profile-image" src={ProfileImage} alt="Profile image"/>
              <label className="friend-name-messages">{friendName.first_name} {friendName.last_name}</label>
              <label className="friend-messages-date">{latestMessages[index].date}</label>
              <br/>
              <br/>
              <label className="friend-messages">{latestMessages[index].friend_message}</label>
            </div>
          )
          :
          //if name input is not empty, display friend messages with the name
          friendNames?.map((friendName, index) => 
            ((friendName.last_name !== null) ? friendName.first_name + " " + friendName.last_name : friendName.first_name).includes(name) ?
              <div className="user-container" key={friendName.id} onClick={() => {
                document.querySelector(".friend-name-conversation").textContent = friendName.first_name + " " + friendName.last_name;
                getFriendStatus(setFriendStatus, profileId, friendName.id);
                setCount(count + 1);
    
                if (count === 2) {
                  getMessages(setMessages, friendStatus.friend_id);
                  setCount(count - 1);
                }
              }}>
                <img className="user-profile-image" src={ProfileImage} alt="Profile image"/>
                <label className="friend-name-messages">{friendName.first_name} {friendName.last_name}</label>
                <label className="friend-messages-date">{latestMessages[index].date}</label>
                <br/>
                <br/>
                <label className="friend-messages">{latestMessages[index].friend_message}</label>
              </div>
              :
              <div></div>
          )
      }
    </>
  );
}

export default FriendMessages;