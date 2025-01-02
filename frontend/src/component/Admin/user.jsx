import React, { useState, useEffect } from 'react';
import Dashboard from "./dashboard";
import "./user.css";
import { useNavigate, Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import Pagination from './Pagination';
import axios from 'axios';
import Nav from './Nav'
const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchUsers = async (pageNumber = 1, pageSize = 5) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/getUser', {
        params: { pageNumber, pageSize },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.items || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
      setError('Error fetching users');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUsers(currentPage).finally(() => setLoading(false))
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // modal, create
  const [createModal, setCreateModal] = useState(false);
  const handleOpenModal = () => setCreateModal(true);
  const handleCloseModal = () => setCreateModal(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createError, setCreateError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateError("");
    if (!userName || !email || !password) {
      setCreateError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/users/createUser',
        { userName, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
      setUsers((prevUsers) => [response.data, ...prevUsers]);

      setUserName("");
      setEmail("");
      setPassword("");

      handleCloseModal();
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      setCreateError("Failed to create user. Please try again.");
    }
  };



  //delete 
const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5000/api/users/delete/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Delete response:", response.data);

      setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== selectedUser._id)
    );
      setDeleteModal(false);
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
    }
  };

const handleOpenDeleteModal = (user) =>{
  setSelectedUser(user); 
setDeleteModal(true)
}



  //update 
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateError, setUpdateError] = useState("");
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateError("");
    if (!email, !userName) {
      setUpdateError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/users/edit/${selectedUser._id}`,
        { email, userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Edit response:", response.data);

      setUsers((prevsUsers) =>
        prevsUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, email, userName } : user
        )
      );

      setUpdateModal(false);
      setSelectedUser(null);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
    }
  };

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setUserName(user.userName);
    setEmail(user.email);
    setUpdateModal(true);
  };




  return (
    <>
      <Nav/>
      <div className="vh-100 table-wrapper">
        <div className="table-title">
          <div className="table-nav">
            <h2 className="name-user">Manage User</h2>
            <button
              className="btn btn-success btn-sm"
              onClick={handleOpenModal}
            >
              <IoPersonAddSharp />
            </button>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                    {error}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No users found</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{(currentPage - 1) * 5 + index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleOpenUpdateModal(user)}
                        className="btn edit"
                      >
                        <FiEdit className="material-icons" title="Edit" />
                      </button>
                      <button onClick={() =>handleOpenDeleteModal(user)} className="btn delete" >
                        <MdDelete className="material-icons" title="Delete" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {createModal && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Create User</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={handleCloseModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label>User Name <strong style={{ color: "red" }}>*</strong>:</label>
                        <input
                          type="text"
                          placeholder="Name"
                          className="form-control"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label>Email <strong style={{ color: "red" }}>*</strong>:</label>
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label>Password <strong style={{ color: "red" }}>*</strong>:</label>
                        <input
                          type="password"
                          placeholder="Password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {createError && (
                        <div className="mb-3 text-danger">
                          {createError}
                        </div>
                      )}
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}



          {updateModal && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update User</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setUpdateModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form
                      onSubmit={handleUpdate}
                    >
                      <div className="mb-4">
                        <label>
                          User Name <strong style={{ color: "red" }}>*</strong>:
                        </label>
                        <input
                          type="text"
                          placeholder="Name"
                          className="form-control"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label>
                          Email <strong style={{ color: "red" }}>*</strong>:
                        </label>
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {updateError && (
                        <div className="mb-3 text-danger">{updateError}</div>
                      )}
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setUpdateModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

        {deleteModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete User</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={handleDelete}
                  >
                    <div className="mb-4">
                     <h2>Are you sure to do delete user</h2>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-danger">
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setDeleteModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};
export default User;