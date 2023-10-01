import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch("http://localhost:3001")
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((data) => {
        setUsers(data);
      });
  }

  function createUser() {
    let name = prompt("Enter user name");
    let email = prompt("Enter user email");
    fetch("http://localhost:3001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getUsers();
      });
  }

  function deleteUser() {
    let id = prompt("Enter user id");
    fetch(`http://localhost:3001`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getUsers();
      });
  }

  return (
    <div>
      {users ? users : "There is no user data available"}
      <br />
      <button onClick={createUser}>Add user</button>
      <br />
      <button onClick={deleteUser}>Delete user</button>
    </div>
  );
}

export default App;
