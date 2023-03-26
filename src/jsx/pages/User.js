import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import pic1 from "./../../images/profile/small/pic1.jpg";
import Editable from "./Editable";
import config from "../../config";

var axios = require("axios");

const User = () => {
  const [userList, setUsersList] = useState([]);

  const getUsersList = () => {
    axios({
      method: "get",
      url: config.base_url + "/api/User/GetUsers",
    })
      .then(function (response) {
        var UsersListResult = response.data;
        console.log(UsersListResult, "test it");
        setUsersList(UsersListResult);
        console.log(userList, "test userlist new");
      });
  };

  useEffect(() => {
    getUsersList();
  }, []);

  // delete data
  const handleDeleteClick = (contentId) => {
    console.log(contentId,'test content id')
    axios({
      method: "delete",
      url: config.base_url + `/api/User/DeleteUser?guid=${contentId}`,
    })
      .then(function (response) {
        console.log(contentId, "has been clicked");
        var deletEresult = response.data;
        console.log(deletEresult, "deletEresult test it");
        const newuserList = [...userList];
        const index = userList.findIndex((content) => content.guid === contentId);
        newuserList.splice(index, 1);
        setUsersList(newuserList);
      });
  };

  //Modal box
  const [addCard, setAddCard] = useState(false);
  //Add data
  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // Add contact function
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const { target: { name, value } } = event;
    const newFormData = { ...addFormData };
    newFormData[name] = value;
    setAddFormData(newFormData);
  };

  //Add Submit data
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = "";
    if (addFormData.name === "") {
      error = true;
      errorMsg = "Please fill  firstName";
    }
    if (!error) {

      let data = {
        "guid": "",
        "firstName": addFormData.firstName,
        "lastName": addFormData.lastName,
        "phone": addFormData.phone,
        "email": addFormData.email,
      };

      axios({
        method: 'post',
        url: config.base_url + '/api/User/AddUser',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      })
        .then(function (response) {
          data.guid = nanoid();
          console.log(JSON.stringify(response.data));

          const newuserList = [...userList, data];
          setUsersList(newuserList);
          setAddCard(false);
          swal("Good job!", "Successfully Added", "success");

          setAddFormData({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
          })
          getUsersList();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  //Edit start
  //const [editModal, setEditModal] = useState(false);
  // Edit function editable page loop
  const [editContentId, setEditContentId] = useState(null);

  // Edit function button click to edit
  const handleEditClick = (event, content) => {
    event.preventDefault();
    setEditContentId(content.guid);
    const formValues = {
      firstName: content.firstName,
      lastName: content.lastName,
      phone: content.phone,
      email: content.email,
    };
    setEditFormData(formValues);
    //setEditModal(true);
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  //update data function
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const { target: { name, value } } = event;
    const newFormData = { ...editFormData };
    newFormData[name] = value;
    setEditFormData(newFormData);
  };

  // edit form data submit
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContent = {
      id: editContentId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      phone: editFormData.phone,
      email: editFormData.email,
    };
    const newuserList = [...userList];
    const index = userList.findIndex((content) => content.guid === editContentId);
    newuserList[index] = editedContent;
    setUsersList(newuserList);
    setEditContentId(null);
    // setEditModal(false);

    let data = {
      "guid": editContentId,
      "firstName": editFormData.firstName,
      "lastName": editFormData.lastName,
      "phone": editFormData.phone,
      "email": editFormData.email,
    };

    axios({
      method: 'put',
      url: config.base_url + 'api/User/UpdateUser',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    })
      .then(function (response) {
        console.log(response,'edit response')
        const newuserList = [...userList, data];
        setUsersList(newuserList);
        setAddCard(false);
        swal("Good job!", "Successfully Updated", "success");

        setEditFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        })
        getUsersList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //Cencel button to same data
  const handleCancelClick = () => {
    setEditContentId(null);
  };

  return (
    <>
      <div className="col-12">
        <Modal className="modal fade" show={addCard} onHide={setAddCard}>
          <div className="" role="document">
            <div className="">
              <form onSubmit={handleAddFormSubmit}>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">Add Contact</h4>
                  <button
                    type="button"
                    className="btn-close btn btn-danger"
                    onClick={() => setAddCard(false)}
                    data-dismiss="modal"
                  >
                    close
                  </button>
                </div>
                <div className="modal-body">
                  <i
                    className="flaticon-cancel-12 close"
                    data-dismiss="modal"
                  ></i>
                  <div className="add-contact-box">
                    <div className="add-contact-content">
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          firstName
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="firstName"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="name"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">lastName</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="lastName"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="lastName"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <label className="text-black font-w500">phone</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="phone"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="phone"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">Email</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="email"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="email"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddCard(false)}
                    className="btn btn-danger"
                  >
                    {" "}
                    <i className="flaticon-delete-1"></i> Discard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">User List</h4>
            <div>
              <Link
                className="btn btn-primary shadow btn-xs sharp mr-2 add-user-btn"
                onClick={() => setAddCard(true)}
              >
                <i className="fa fa-plus">Add Users</i>

              </Link>
            </div>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <form onSubmit={handleEditFormSubmit}>
                  <table id="example" className="display w-100 dataTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>phone</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log(userList, "test conte")}

                      {userList.map((content) => (
                        <>
                          {editContentId === content.guid ? (
                            <Editable
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            />
                          ) : (
                            <tr>
                              <td>
                                <img
                                  className="rounded-circle"
                                  width="35"
                                  src={pic1}
                                  alt=""
                                />
                              </td>
                              <td>{content.firstName}</td>
                              <td>{content.lastName}</td>
                              <td>
                                <strong>{content.phone}</strong>
                              </td>
                              <td>
                                <strong>{content.email}</strong>
                              </td>
                              <td>
                                <div className="d-flex">

                                  <Link
                                    className="btn btn-secondary	 shadow btn-xs sharp mr-2"
                                    onClick={(event) =>
                                      handleEditClick(event, content)
                                    }
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  <Link
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() =>
                                      handleDeleteClick(content.guid)
                                    }
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;