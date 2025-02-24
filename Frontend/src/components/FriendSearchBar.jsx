import { Form } from "react-bootstrap";

function FriendSearchBar({setName=null}) {
  return (
    <>
      <Form.Control
        className="friend-search-bar"
        id="searchFriends"
        placeholder="Search"
        onKeyDown={(event) => {
          setName(document.getElementById("searchFriends").value);
          
          if (event.key === "Enter") {
            setName(document.getElementById("searchFriends").value);
          }
        }}
      />
    </>
  );
}

export default FriendSearchBar;