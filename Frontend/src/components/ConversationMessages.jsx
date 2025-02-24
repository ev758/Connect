function ConversationMessages({profileId, messages}) {

  return (
    <>
      <div className="conversation-container">
        <div className="text-messages" id="textMessages">
          {
            //displays user and friend messages dynamically
            messages?.map(message => 
              //if chat user id is equal to user id, display message to the right in the conversation
              (message.chat_user === profileId) ?
                <div key={messages.id}>
                  <div className="user-message">
                    <p className="text">
                      {message.friend_message}
                      <br/>
                      <label className="date">{message.date}</label>
                    </p>
                  </div>
                </div>
                :
                //if chat user id is not equal to user id, display message to the left in the conversation
                <div key={messages.id}>
                  <div className="friend-text-message">
                    <p className="text">
                      {message.friend_message}
                      <br/>
                      <label className="date">{message.date}</label>
                    </p>
                  </div>
                </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default ConversationMessages;