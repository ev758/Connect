import django_api from "../django_api.js";

const getFriendStatus = async (setFriendStatus, senderId, receiverId) => {
    try {
      //sends GET request to get friend status
      const response = await django_api.get(`friend-status/${senderId}/${receiverId}/`);

      if (response.status === 200) {
        setFriendStatus(response.data);
      }
      else {
        throw new Error("Could not get friend status");
      }
    }
    catch (error) {
      console.error(error);
    }
}

export default getFriendStatus;