import django_api from "../django_api.js";

const getLatestMessages = async (setLatestMessages) => {
    try {
      //sends GET request to get latest messages
      const response = await django_api.get("messages/latest-message/list/");

      if (response.status === 200) {
        setLatestMessages(response.data);
      }
      else {
        throw new Error("Could not get latest messages");
      }
    }
    catch (error) {
      console.error(error);
    }
}

export default getLatestMessages;