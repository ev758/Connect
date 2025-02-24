import django_api from "../django_api";

const getMessages = async (setMessages, friendStatusId) => {
    try {
      //sends GET request to get messages
      const response = await django_api.get(`messages/list/chat${friendStatusId}/`);

      if (response.status === 200) {
        setMessages(response.data);
      }
      else {
        throw new Error("Could not get messages");
      }
    }
    catch (error) {
      console.error(error);
    }
}

export default getMessages;