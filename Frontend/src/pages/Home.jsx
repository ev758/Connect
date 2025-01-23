import { Dropdown } from "react-bootstrap";

function Home() {
  return (
    <>
      <div className="page-border">
        <h1 className="title-header"><b>Connect</b></h1>

        <Dropdown>
          <Dropdown.Toggle className="material-icons profile" variant="light">
            person
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
            <Dropdown.Item href="/login" onClick={() => {localStorage.clear()}}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default Home;