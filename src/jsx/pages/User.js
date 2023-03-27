import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import pic1 from "./../../images/profile/small/pic1.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../store/actions/UsersActions";

const User = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.users);
  const userId = useSelector((state) => state.auth.auth.data.UserId);
  const companyId = useSelector((state) => state.auth.auth.data.CompanyId);
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  console.log({ companyId });
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = (id) => {
    swal({
      text: "Are you sure you want to delete this company?",
      buttons: {
        no: {
          text: "No",
          value: false,
        },
        yes: {
          text: "Yes",
          value: true,
        },
      },
    }).then((res) => {
      if (res) {
        dispatch(deleteUser(id)).then(() => dispatch(fetchUsers()));
      }
    });
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    const newFormData = Object.assign({}, formData);
    newFormData[name] = value;
    setFormData(newFormData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = "";
    if (formData.name === "") {
      error = true;
      errorMsg = "Please fill firstName";
    }
    if (!error) {
      let data = {
        guid: isEdit ? formData.guid : "",
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        companyId: companyId,
        userType: 0,
        isActive: true,
        isDeleted: false,
        createdDate: new Date().toISOString(),
        createdBy: userId,
        modifiedDate: new Date().toISOString(),
        modifiedBy: userId,
      };

      console.log({ data, isEdit });
      try {
        let response;
        if (isEdit) {
          response = await dispatch(updateUser(data));
        } else {
          response = await dispatch(addUser(data));
        }
        console.log({ response });
        swal(
          "Good job!",
          `Successfully ${isEdit ? "Updated" : "Added"}`,
          "success"
        );
        setShowModal(false);

        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        });
      } catch (error) {
        console.log(error);
        swal("Oops", error.message, "error");
      }
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  const handleEditClick = (event, content) => {
    setIsEdit(true);
    const formData = {
      guid: content.guid,
      firstName: content.firstName,
      lastName: content.lastName,
      phone: content.phone,
      email: content.email,
    };
    setFormData(formData);
    setShowModal(true);
  };

  return (
    <>
      <div className="col-12">
        <Modal className="modal fade" show={showModal} onHide={setShowModal}>
          <div className="" role="document">
            <div className="">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">
                    {isEdit ? "Update" : "Add"} Contact
                  </h4>
                  <button
                    type="button"
                    className="btn-close btn btn-danger"
                    onClick={() => setShowModal(false)}
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
                          First Name
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="firstName"
                            value={formData.firstName}
                            required="required"
                            onChange={handleInputChange}
                            placeholder="name"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Last Name
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="lastName"
                            value={formData.lastName}
                            required="required"
                            onChange={handleInputChange}
                            placeholder="lastName"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <label className="text-black font-w500">Phone</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="phone"
                            required="required"
                            value={formData.phone}
                            onChange={handleInputChange}
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
                            value={formData.email}
                            required="required"
                            onChange={handleInputChange}
                            placeholder="email"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {isEdit ? "Update" : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
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
              <button
                type="button"
                className="btn btn-primary shadow btn-xs sharp mr-2 add-user-btn"
                onClick={() => {
                  setIsEdit(false);
                  setShowModal(true);
                }}
              >
                <i className="fa fa-plus">Add Users</i>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr>
                      <th></th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((content) => (
                      <tr key={content.guid}>
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
                            <button
                              type="button"
                              className="btn btn-secondary	 shadow btn-xs sharp mr-2"
                              onClick={(event) =>
                                handleEditClick(event, content)
                              }
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => handleDeleteClick(content.guid)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
