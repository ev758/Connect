import { useState } from "react";
import FriendSearchBar from "./FriendSearchBar.jsx";
import FriendMessages from "./FriendMessages.jsx";

function MessagesList({profileId, friendStatus, setFriendStatus, setMessages}) {
  const [name, setName] = useState("");

  return (
    <>
      <div className="messages-list">
        <h4 className="messages-title">Messages</h4>

        <FriendSearchBar setName={setName}/>

        <FriendMessages
          profileId={profileId}
          name={name}
          friendStatus={friendStatus}
          setFriendStatus={setFriendStatus}
          setMessages={setMessages}
        />
      </div>
    </>
  );
}

export default MessagesList;