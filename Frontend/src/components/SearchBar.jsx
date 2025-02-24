import { Button, Form, InputGroup } from "react-bootstrap";
import django_api from "../django_api.js";

function SearchBar({setUserList=null, setName=null, searchBarId}) {

  const getUserList = async () => {
    const name = document.getElementById(searchBarId).value;
    try {
      //sends GET request to get list of users by name
      const response = await django_api.get(`user-list/${name}/`);

      if (response.status === 200) {
        setUserList(response.data);
      }
      else {
        throw new Error("Could not get user list");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          id={searchBarId}
          onKeyDown={(event) => {
            if (searchBarId === "searchUserList") {
              if (event.key === "Enter") {
                getUserList();
              }
            }
            else {
              setName(document.getElementById(searchBarId).value);
            }
          }}
        />
        <Button
          onClick={() => {
            if (searchBarId === "searchUserList") {
              getUserList();
            }
            else {
              setName(document.getElementById(searchBarId).value);
            }
          }}
          variant="dark"
        >
          Search
        </Button>
      </InputGroup>
    </>
  );
}

export default SearchBar;