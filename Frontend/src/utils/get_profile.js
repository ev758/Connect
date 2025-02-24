import django_api from "../django_api.js";

const getProfile = async (setProfile) => {
    try {
      //sends GET request to get profile
      const response = await django_api.get("profile/");

      if (response.status === 200) {
        setProfile(response.data);
      }
      else {
        throw new Error("Could not get profile");
      }
    }
    catch (error) {
      console.error(error);
    }
}

export default getProfile;