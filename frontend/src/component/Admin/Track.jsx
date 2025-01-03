import React, { useState, useEffect } from 'react';
import "./track.css";
import { useNavigate, Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from 'axios';
import Nav from './Nav';
import Pagination from './Pagination'
const Track = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
  
    const fetchSongs = async (pageNumber = 1, pageSize = 5) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/song/getSong', {
          params: { pageNumber, pageSize },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSongs(response.data.items || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching songs:', error.response?.data || error.message);
        setError('Error fetching songs');
      }
    };
  
    useEffect(() => {
      setLoading(true);
      fetchSongs(currentPage).finally(() => setLoading(false))
    }, [currentPage]);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

  // modal, create
  const [createModal, setCreateModal] = useState(false);
  const handleOpenModal = () => setCreateModal(true);
  const handleCloseModal = () => setCreateModal(false);

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [img, setImg] = useState("");
  const [duration, setDuration] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [createError, setCreateError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateError("");
    if (!name || !artist || !img || !duration ||!audioURL) {
      setCreateError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/song/createSong',
        { name, artist, img, duration, audioURL },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchSongs();
      setSongs((prevSongs) => [response.data, ...prevSongs]);

      setName("");
      setArtist("");
      setImg("");
      setAudioURL("");
      setDuration("");

      handleCloseModal();
    } catch (error) {
      console.error("Error creating song:", error.response?.data || error.message);
      setCreateError("Failed to create song. Please try again.");
    }
  };


   //update 
   const [updateModal, setUpdateModal] = useState(false);
   const [selectedSong, setSelectedSong] = useState(null);
   const [updateError, setUpdateError] = useState("");
   const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateError("");
  
    if (!name || !artist || !img) {
      setUpdateError("All fields are required.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/song/putSong/${selectedSong._id}`,
        { name, artist, img },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Edit response:", response.data);
  
      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song._id === selectedSong._id ? { ...song, name, artist, img } : song
        )
      );
  
      setUpdateModal(false);
      setSelectedSong(null);
    } catch (error) {
      console.error("Error updating song:", error.response?.data || error.message);
      setUpdateError("Failed to update song. Please try again.");
    }
  };
  
  const handleOpenUpdateModal = (song) => {
    setSelectedSong(song);
    setName(song.name);
    setArtist(song.artist);
    setImg(song.img);
    setUpdateModal(true);
  };


  //delete 
const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5000/api/song/delete/${selectedSong._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Delete response:", response.data);

      setUsers((prevSongs) =>
      prevSongs.filter((song) => song._id !== selectedSong._id)
    );
      setDeleteModal(false);
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting song:", error.response?.data || error.message);
    }
  };

const handleOpenDeleteModal = (song) =>{
  setSelectedSong(song); 
setDeleteModal(song)
}



 


  return (
    <>
      <Nav/>
      <div className="vh-100 table-wrapper">
        <div className="table-title">
          <div className="table-nav">
            <h2 className="name-track">Manage Song</h2>
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
                <th>Img</th>
                <th>Name</th>
                <th>Artist</th>
                <th>Action</th>
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
              ) : songs.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No songs found</td>
                </tr>
              ) : (
                songs.map((song, index) => (
                    <tr key={song._id}>
                    <td>{(currentPage - 1) * 5 + index + 1}</td>
                    <td> <img
    src={song.img} 
    alt={song.name} 
    style={{ width: "50px", height: "50px", objectFit: "cover" }} 
  /></td>
                    <td>{song.name}</td>
                    <td>{song.artist}</td>
                    <td>
                      <button
                        onClick={() => handleOpenUpdateModal(song)}
                        className="btn edit"
                      >
                        <FiEdit className="material-icons" title="Edit" />
                      </button>
                      <button onClick={() =>handleOpenDeleteModal(song)} className="btn delete" >
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
          <h5 className="modal-title">Create Song</h5>
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
              <label>Image URL <strong style={{ color: "red" }}>*</strong>:</label>
              <input
                type="text"
                placeholder="Enter image URL"
                className="form-control"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Song Name <strong style={{ color: "red" }}>*</strong>:</label>
              <input
                type="text"
                placeholder="Enter song name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Artist <strong style={{ color: "red" }}>*</strong>:</label>
              <input
                type="text"
                placeholder="Enter artist name"
                className="form-control"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Duration <strong style={{ color: "red" }}>*</strong>:</label>
              <input
                type="text"
                placeholder="Enter duration (e.g., 3:45)"
                className="form-control"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Audio URL <strong style={{ color: "red" }}>*</strong>:</label>
              <input
                type="text"
                placeholder="Enter audio URL"
                className="form-control"
                value={audioURL}
                onChange={(e) => setAudioURL(e.target.value)}
                required
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
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
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
          <h5 className="modal-title">Update Song</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              setUpdateModal(false);
              setUpdateError("");
            }}
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label>
                Image URL <strong style={{ color: "red" }}>*</strong>:
              </label>
              <input
                type="text"
                placeholder="Enter image URL"
                className="form-control"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>
                Song Name <strong style={{ color: "red" }}>*</strong>:
              </label>
              <input
                type="text"
                placeholder="Enter song name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>
                Artist <strong style={{ color: "red" }}>*</strong>:
              </label>
              <input
                type="text"
                placeholder="Enter artist name"
                className="form-control"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
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
                onClick={() => {
                  setUpdateModal(false);
                  setUpdateError("");
                }}
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
                  <h5 className="modal-title">Delete Song</h5>
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
                     <h2>Are you sure to do delete song</h2>
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
export default Track;