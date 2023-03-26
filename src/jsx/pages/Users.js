import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { nanoid } from 'nanoid';
import swal from "sweetalert";

var axios = require("axios");

const Users = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#patient_list tbody tr")
  );
  const [modalCentered, setModalCentered] = useState(false);
  const [userList, setUsersList] = useState([]);
  const sort = 5;
  const activePag = useRef(0);
  const [test, settest] = useState(0);



  //Modal box
  const [addUser, setAddUser] = useState(false);
  //Add data 
  const [addFormData, setAddFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  });

  // Add contact function
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('firstname');
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  //Add Submit data
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = '';
    if (addFormData.firstname === "") {
      error = true;
      errorMsg = 'Please fill first name';
    } else if (addFormData.lastname === "") {
      error = true;
      errorMsg = 'Please fill last name.';
    } else if (addFormData.email === "") {
      error = true;
      errorMsg = "please fill email";
    }
    if (!error) {
      const newUser = {
        id: nanoid(),
        firstname: addFormData.firstname,
        lastname: addFormData.lastname,
        phone: addFormData.phone,
        email: addFormData.email,
      };

      const newUserList = [...userList, newUser];
      setUsersList(newUserList);
      setAddUser(false);
      swal('Good job!', 'Successfully Added', "success");
      addFormData.firstname = addFormData.lastname = addFormData.phone = addFormData.email = '';

    } else {
      swal('Oops', errorMsg, "error");
    }
  };

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };
  const getUsersList = () => {

    var config = {
      method: "get",
      url: "http://18.119.107.89:90/api/User/GetUsers",
    };

    axios(config).then(function (response) {
      var UsersListResult = response.data;
      console.log(UsersListResult, "test it");
      setUsersList(UsersListResult);
    });
  };


  const deleteUser = (id) => {
    var config = {
      method: "delete",
      url: `http://18.119.107.89:90/api/User/DeleteUser?guid=${id}`,
    };

    axios(config).then(function (response) {
      console.log(id, 'has been clicked')
      var deleteResult = response.data;
      console.log(deleteResult, "deleteResult test it");
      const newUserList = [...userList];
      let result = userList.findIndex(function (object) {
        return object.guid === id;
      });
      newUserList.splice(result, 1);
      setUsersList(newUserList);
    });
  }

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
    const fieldName = event.target.getAttribute("firstName");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
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
  };
  //Cencel button to same data
  const handleCancelClick = () => {
    setEditContentId(null);
  };


  // use effect
  useEffect(() => {
    getUsersList();
    setData(document.querySelectorAll("#patient_list tbody tr"));
  }, [test]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  const chackbox = document.querySelectorAll(".patient_checkbox input");
  const motherChackBox = document.querySelector(".patient_strg input");
  // console.log(document.querySelectorAll(".all_spending_strg input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  const loginSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, "Your firstname must consist of at least 3 characters ")
      .max(50, "Your firstname must consist of at least 3 characters ")
      .required("Please enter a firstname"),
    lastname: Yup.string()
      .min(3, "Your lastname must consist of at least 3 characters ")
      .max(50, "Your lastname must consist of at least 3 characters ")
      .required("Please enter a lastname"),
    email: Yup.string()
      .min(3, "Your email must consist of at least 3 characters ")
      .max(50, "Your email must consist of at least 3 characters ")
      .required("Please enter a email"),
    phone: Yup.string()
      .min(6, "Your phone must consist of at least 6 characters ")
      .max(15, "Your email must consist of at least 15 characters ")
      .required("Please enter a phone"),
  });
  return (
    <>
      <div className="form-head d-flex mb-3 mb-md-4 align-items-start">
        <div className="mr-auto d-none d-lg-block">
          <Link className="btn btn-primary shadow btn-xs sharp mr-2"
            onClick={() => setAddUser(true)}
          >
            <i className="fa fa-plus"></i>
          </Link>

        </div>
        <div className="input-group search-area ml-auto d-inline-flex mr-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search here"
          />
          <div className="input-group-append">
            <button type="button" className="input-group-text">
              <i className="flaticon-381-search-2" />
            </button>
          </div>
        </div>
        <Link to="/patient-list" className="settings-icon">
          <i className="flaticon-381-settings-2 mr-0" />
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            <div id="patient_list" className="dataTables_wrapper no-footer">
              <table
                id="example5"
                className="table table-striped patient-list mb-4 dataTablesCard fs-14 dataTable no-footer"
                role="grid"
                aria-describedby="example5_info"
              >
                <thead>
                  <tr role="row">
                    <th
                      className="patient_strg"
                      tabIndex={0}
                      aria-controls="example5"
                      rowSpan={1}
                      colSpan={1}
                      aria-sort="ascending"
                      style={{ width: 24 }}
                    >
                      <div className="checkbox text-right align-self-center">
                        <div className="custom-control custom-checkbox ">
                          <input
                            type="checkbox"
                            onClick={() => chackboxFun("all")}
                            className="custom-control-input"
                            id="checkAll"
                            required
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="checkAll"
                          />
                        </div>
                      </div>
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="example5"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="Patient Name: activate to sort column ascending"
                      style={{ width: 108 }}
                    >
                      First Name
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="example5"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="Doctor Assgined: activate to sort column ascending"
                      style={{ width: 135 }}
                    >
                      Last Name
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="example5"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="Disease: activate to sort column ascending"
                      style={{ width: 68 }}
                    >
                      Email
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="example5"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="Status: activate to sort column ascending"
                      style={{ width: 103 }}
                    >
                      Phone
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="example5"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="Date Check In: activate to sort column ascending"
                      style={{ width: 113 }}
                    >
                      Date Check In
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="example5"
                      rowSpan={1}
                      colSpan={1}
                      aria-label=": activate to sort column ascending"
                      style={{ width: 24 }}
                    />
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="example5"
                      rowSpan={1}
                      colSpan={1}
                      aria-label=": activate to sort column ascending"
                      style={{ width: 24 }}
                    />
                  </tr>
                </thead>
                <tbody>
                  {userList.map(function (item, i) {
                    return (
                      <tr role="row" className="odd">
                        <td className="patient_checkbox">
                          <div className="checkbox text-right align-self-center">
                            <div className="custom-control custom-checkbox ">
                              <input
                                type="checkbox"
                                onClick={() => chackboxFun()}
                                className="custom-control-input"
                                id="customCheckBox1"
                                required
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckBox1"
                              />
                            </div>
                          </div>
                        </td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.createdDate}</td>
                        <td>
                          <Link
                            className="btn btn-secondary	 shadow btn-xs sharp mr-2"
                            onClick={(event) =>
                              handleEditClick(event, item)
                            }
                          >
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
                                stroke="#3E4954"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </td>
                        <td>
                          <svg
                            width={24}
                            onClick={() => deleteUser(item.guid)}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 6H5H21"
                              stroke="#F46B68"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                              stroke="#F46B68"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="d-sm-flex text-center justify-content-between align-items-center">
                <div
                  className="dataTables_info"
                  id="example5_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing {activePag.current * sort + 1} to{" "}
                  {data.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : data.length}{" "}
                  of {data.length} entries
                </div>
                <div className="dataTables_paginate paging_simple_numbers d-flex  justify-content-center align-items-center pb-3">
                  <Link
                    to="/patient-list"
                    className="paginate_button previous disabled"
                    aria-controls="example5"
                    data-dt-idx={0}
                    tabIndex={0}
                    id="example5_previous"
                    onClick={() =>
                      activePag.current > 0 && onClick(activePag.current - 1)
                    }
                  >
                    Previous
                  </Link>
                  <span className="d-flex">
                    {paggination.map((number, i) => (
                      <Link
                        key={i}
                        to="/users"
                        className={`paginate_button d-flex align-items-center justify-content-center ${activePag.current === i ? "current" : ""
                          } ${i > 0 ? "ml-1" : ""}`}
                        aria-controls="example5"
                        data-dt-idx={1}
                        tabIndex={0}
                        onClick={() => onClick(i)}
                      >
                        {number}
                      </Link>
                    ))}
                  </span>

                  <Link
                    to="/users"
                    className="paginate_button next disabled"
                    aria-controls="example5"
                    data-dt-idx={2}
                    tabIndex={0}
                    id="example5_next"
                    onClick={() =>
                      activePag.current + 1 < paggination.length &&
                      onClick(activePag.current + 1)
                    }
                  >
                    Next
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
