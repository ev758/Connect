import ConversationMessages from "./ConversationMessages.jsx";
import django_api from "../django_api.js";
import ProfileImage from "../assets/profile.jpg";

function Conversation({profileId, friendName="", friendStatus=null, messages, webSocketSendMessage}) {

  const sendMessage = async (event) => {
    const message = document.getElementById("message");

    if (event.key === "Enter") {
      try {
        //sends POST request to create a message
        const response = await django_api.post("messages/send-message/", {
          friend_message: message.value,
          chat_name: "chat" + friendStatus.friend_id,
        });

        if (response.status === 200) {
          //sends message to server
          webSocketSendMessage.send(JSON.stringify({
            "id": profileId,
            "message": message.value
          }));
        }
        else {
          throw new Error("Could not send message");
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className="conversation">
        <div className="conversation-header">
            <img className="user-profile-image" src={ProfileImage} alt="Profile image"/>
            <label className="friend-name-conversation">{friendName}</label>
        </div>

        <ConversationMessages profileId={profileId} messages={messages}/>

        <textarea id="message" placeholder="Message" onKeyDown={sendMessage}></textarea>
      </div>
    </>
  );
}

export default Conversation;