import django_api from "../django_api.js";

const friendNamesList = async (setFriendNames) => {
    try {
      //sends GET request to get the names of user's friends by latest messages
      const response = await django_api.get("messages/friend-names/list/");

      if (response.status === 200) {
        setFriendNames(response.data);
      }
      else {
        throw new Error("Could not get friend names");
      }
    }
    catch (error) {
      console.error(error);
    }
}

export default friendNamesList;