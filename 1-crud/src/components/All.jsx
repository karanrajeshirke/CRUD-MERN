import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import New from "./New";
const All = () => {
  //!----------------------------------------------------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

//! it is used to open  a modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  //! it is used to close a modal
  const handleOk = () => {
    setIsModalOpen(false);
  };

  //! also used to close a model that cross cancel 

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //?-------------------------

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  //!----------------------------------------------------------------------------------------------
  const [users, setUsers] = useState([]);
  const getAllData = async () => {
    try {
      let response = await axios.get("http://localhost:8000/getall");

      console.log(response.data.users);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  //!----------------------------------------------------------------------------------------------

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleInput = async (event) => {
    setNewUser((prevUser) => {
      return {
        ...prevUser,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.post("http://localhost:8000/add", newUser);
      setNewUser({
        name: "",
        email: "",
        role: "",
      });
      alert(response.data.message);
      handleOk();
      getAllData()
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  //!----------------------------------------------------------------------------------------------

  const [selectedUser,setSelectedUser]=useState({name: "",
  email: "",
  role: "",})
  function handleEdit(user)
  {
    showModal2()
    setSelectedUser(user)
    console.log(selectedUser)
  }

  const handleInput2 = async (event) => {
    setSelectedUser((prevUser) => {
      return {
        ...prevUser,
        [event.target.name]: event.target.value,
      };
    });
  };

  async function handleForm2 (event){
    event.preventDefault()
   try
   {
    let response=await axios.put(`http://localhost:8000/update/${selectedUser._id}`,selectedUser)
    alert(response.data.message);
    handleOk2()
    getAllData()
   }catch (error) {
    console.log(error);
    alert(error.message);
  }


  }


  async function deleteUser(userId)
  {
    try {
        let response = await axios.delete(`http://localhost:8000/delete/${userId}`);
        alert(response.data.message);
        getAllData()
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
  }



  return (
    <>

      <div className="container ">
      <div className="d-grid gap-2 col-4 mx-auto mt-4">
      <button className="btn btn-dark" onClick={showModal}>
        ADD A NEW USER
      </button>
      </div>
      
      <div className="content d-flex justify-content-center mt-3 ">
        <table className="table w-75 ">
          <thead>
            <tr>
              <th scope="col">SR.NO</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>

            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><button className="btn btn-primary" onClick={()=>handleEdit(user)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={()=>deleteUser(user._id)}>Delete</button></td>


                  </tr>
                );
              })}
          </tbody>
        </table>

        <Modal
          title="Enter Details"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <form onSubmit={handleForm}>
            <div className="mb-3">
              name:
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleInput}
                value={newUser.name}
                required
              />
            </div>
            <div className="mb-3">
              email:
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleInput}
                value={newUser.email}
                required
              />
            </div>
            <div className="mb-3">
              role:
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                name="role"
                onChange={handleInput}
                value={newUser.role}
                required

              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal>

        <Modal title="Update Details" open={isModalOpen2}  onCancel={handleCancel2} footer={null}>
        <form onSubmit={handleForm2}>
            <div className="mb-3">
              name:
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleInput2}
                value={selectedUser.name}
                required
              />
            </div>
            <div className="mb-3">
              email:
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleInput2}
                value={selectedUser.email}
                required
              />
            </div>
            <div className="mb-3">
              role:
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                name="role"
                onChange={handleInput2}
                value={selectedUser.role}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
      </Modal>
      </div>
      </div>
    </>
  );
};

export default All;
