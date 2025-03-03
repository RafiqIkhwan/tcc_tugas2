import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`add`} className="button is-success mb-3">
          Add New
        </Link>
        <div className="columns is-multiline">
          {users.map((user, index) => (
            <div key={user.id} className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <p className="title is-5">{user.name}</p>
                  <p className="subtitle is-6">{user.email}</p>
                  <p>{user.gender}</p>
                </div>
                <footer className="card-footer">
                  <Link
                    to={`edit/${user.id}`}
                    className="card-footer-item"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="card-footer-item button is-danger"
                  >
                    Delete
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
