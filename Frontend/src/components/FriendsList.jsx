import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import django_api from "../django_api.js";
import getProfile from "../utils/get_profile.js";
import getFriendStatus from "../utils/get_friend_status.js";
import ProfileImage from "../assets/profile.jpg";

function FriendsList({name}) {
    //declarations
    const [pendingRequests, setPendingRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [profile, setProfile] = useState([]);
    const [friendStatus, setFriendStatus] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        pendingRequest();
        friendsList();
        getProfile(setProfile);
    }, []);

    const pendingRequest = async () => {
        try {
            //sends GET request to get friend requests
            const response = await django_api.get("friend-request/pending/list/");

            if (response.status === 200) {
                setPendingRequests(response.data);
            }
            else {
                throw new Error("Could not get pending friend requests");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const friendsList = async () => {
        try {
            //sends GET request to get friends list
            const response = await django_api.get("friends-list/");

            if (response.status === 200) {
                setFriends(response.data);
            }
            else {
                throw new Error("Could not get friends lists");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const friendRequestOption = async (optionButton, senderId) => {
        const option = document.getElementById(optionButton).textContent;

        try {
            if (option === "Accept") {
                //sends PUT request to update friend status
                const response = await django_api.put("friend-request/option/", {
                    friend_status: true,
                    sender: senderId
                });

                if (response.status === 200) {
                    window.location.reload();
                }
                else {
                    throw new Error("Could not accept friend request");
                }
            }
            else {
                //sends PUT request to update friend status
                const response = await django_api.put("friend-request/option/", {
                    friend_status: false,
                    sender: senderId
                });

                if (response.status === 200) {
                    window.location.reload();
                }
                else {
                    throw new Error("Could not decline friend request");
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const removeFriend = async (friendId) => {
        try {
            //sends DELETE request to remove a friend
            const response = await django_api.delete(`friends-list/remove-friend/${profile.id}/${friendId}/`);

            if (response.status === 200) {
                window.location.reload();
            }
            else {
                throw new Error("Could not remove friend");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

  return (
    <>
      {
        //displays friend requests dynamically
        pendingRequests.map(friendRequestPending => 
            <div className="pending-request" key={friendRequestPending.id}>
                <img className="user-profile-image" src={ProfileImage} alt="Profile image"/>
                <label className="friends-list-name">{friendRequestPending.first_name} {friendRequestPending.last_name}</label>
                <div className="accept-decline">
                    <Button
                        id={"accept" + friendRequestPending.id}
                        onClick={() => {friendRequestOption("accept" + friendRequestPending.id, friendRequestPending.id)}}
                        variant="success"
                    >
                        Accept
                    </Button>
                    <Button
                        id={"decline" + friendRequestPending.id}
                        onClick={() => {friendRequestOption("decline" + friendRequestPending.id, friendRequestPending.id)}}
                        variant="danger"
                    >
                        Decline
                    </Button>
                </div>
            </div>
        )
      }

      {
        //if name input is empty, display all friends dynamically
        (name === "") ?
        friends.map(friend => 
            <div className="user-container" key={friend.id} onMouseEnter={() => {
                getFriendStatus(setFriendStatus, profile.id, friend.id);
            }}>
                <img className="user-profile-image" src={ProfileImage} alt="Profile image"/>
                <label className="friends-list-name">{friend.first_name} {friend.last_name}</label>
                <div className="message-defriend">
                    <Button
                        className="material-icons"
                        id={"message" + friend.id}
                        onClick={() => {
                            navigate("/messages", {
                                state: {
                                    friendStatus: friendStatus,
                                    friendName: friend.first_name + " " + friend.last_name
                                }
                            });
                        }}
                        variant="success"
                    >
                        message
                    </Button>
                    <Button
                        className="material-icons"
                        id={"close" + friend.id}
                        onClick={() => {removeFriend(friend.id)}}
                        variant="danger"
                    >
                        close
                    </Button>
                </div>
            </div>
        )
        :
        //if name input is not empty, display friends with the name
        friends.map(friend => 
            ((friend.last_name !== null) ? friend.first_name + " " + friend.last_name : friend.first_name).includes(name) ?
                <div className="user-container" key={friend.id} onMouseEnter={() => {
                    getFriendStatus(setFriendStatus, profile.id, friend.id);
                }}>
                    <img className="user-profile-image" src={ProfileImage} alt="Profile image"/>
                    <label className="friends-list-name">{friend.first_name} {friend.last_name}</label>
                    <div className="message-defriend">
                        <Button
                            className="material-icons"
                            id={"message" + friend.id}
                            onClick={() => {
                                navigate("/messages", {
                                    state: {
                                        friendStatus: friendStatus,
                                        friendName: friend.first_name + " " + friend.last_name
                                    }
                                });
                            }}
                            variant="success"
                        >
                            message
                        </Button>
                        <Button
                            className="material-icons"
                            id={"close" + friend.id}
                            onClick={() => {removeFriend(friend.id)}}
                            variant="danger"
                        >
                            close
                        </Button>
                    </div>
                </div>
                :
                <div></div>
          )
      }
    </>
  );
}

export default FriendsList;