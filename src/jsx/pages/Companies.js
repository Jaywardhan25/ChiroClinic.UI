import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import PageTitle from "../layouts/PageTitle";
import Editable from "./EditableCompanies";
import { useSelector } from "react-redux";
import config from "../../config";
import axios from 'axios';

const Companies = () => {
  const [CompaniesList, setCompaniesList] = useState([]);
  const userId = useSelector(state => state.auth.auth.data.UserId);

  const getCompaniessList = () => {
    axios({
      method: "get",
      url: config.base_url + "/api/Company/GetAllCompany",
    }).then(function (response) {
      var CompaniessListResult = response.data;
      console.log(CompaniessListResult, "test it");
      setCompaniesList(CompaniessListResult);
      console.log(CompaniesList, "test Companieslist new");
    });
  };

  useEffect(() => {
    getCompaniessList();
  }, []);

  // delete data
  const handleDeleteClick = (contentId) => {
    console.log(contentId, "test dele id");
    axios({
      method: "delete",
      url: config.base_url + `/api/Company/DeleteCompany?id=${contentId}`,
    }).then(function (response) {
      console.log(contentId, "has been clicked");
      var deletEresult = response.data;
      console.log(deletEresult, "deletEresult test it");
      const newCompaniesList = [...CompaniesList];
      const index = CompaniesList.findIndex(
        (content) => content.id === contentId
      );
      newCompaniesList.splice(index, 1);
      setCompaniesList(newCompaniesList);
      getCompaniessList();
    });
  };

  //Modal box
  const [addCard, setAddCard] = useState(false);
  const [question, setQuestion] = useState(false)

  const [addFormData, setAddFormData] = useState({
    companyName: "",
    companyDescription: "",
    isActive: true,
    isDeleted: false,
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
      errorMsg = "Please fill  companyName";
    }
    if (!error) {

      let data = {
        "companyId": 0,
        "companyName": addFormData.companyName,
        "companyDescription": addFormData.companyDescription,
        "createdDate": new Date().toISOString(),
        "createdBy": userId,
        "modifiedDate": new Date().toISOString(),
        "modifiedBy": userId
      };

      var config = {
        method: 'post',
        url: config.base_url + '/api/Company/AddCompany',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };

      axios(config)
        .then(function (response) {
          data.guid = nanoid();
          console.log(JSON.stringify(response.data));

          const newcompanyList = [...CompaniesList, data];
          setCompaniesList(newcompanyList);
          setAddCard(false);
          swal("Good job!", "Successfully Added", "success");

          setAddFormData({
            companyName: "",
            companyDescription: "",
            isActive: true,
            isDeleted: false,
          })
          getCompaniessList();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  // Active data
  // const chageData = (frist, sec) => {
  //   for (var i = 0; i < data.length; ++i) {
  //     if (i >= frist && i < sec) {
  //       data[i].classList.remove("d-none");
  //     } else {
  //       data[i].classList.add("d-none");
  //     }
  //   }
  // };

  //Edit start
  //const [editModal, setEditModal] = useState(false);
  // Edit function editable page loop
  const [editContentId, setEditContentId] = useState(null);

  // Edit function button click to edit
  const handleEditClick = (event, content) => {
    event.preventDefault();
    setEditContentId(content.companyId);
    const formValues = {
      companyName: content.companyName,
      companyDescription: content.companyDescription
    };
    setEditFormData(formValues);
    //setEditModal(true);
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    companyName: "",
    companyDescription: "",
  
  });

  //update data function
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    console.log("Called edit form change", name, value)
    const newFormData = { ...editFormData, [name]: value };
    setEditFormData(newFormData);
  };

/*  const handleEditFormSwitch = (checked, e, id) => {
    const newFormData = { ...editFormData };
    newFormData[id] = checked;
    setEditFormData(newFormData);
  };*/
  // edit form data submit
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContent = {
      id: editContentId,
      companyName: editFormData.companyName,
      companyDescription: editFormData.companyDescription,
    };
    const newCompaniesList = [...CompaniesList];
    const index = CompaniesList.findIndex(
      (content) => content.companyId === editContentId
    );
    newCompaniesList[index] = editedContent;
    setCompaniesList(newCompaniesList);

    let data = {
      "companyId": editContentId,
      "companyName": editFormData.companyName,
      "companyDescription": editFormData.companyDescription,
      "createdDate": new Date().toISOString(),
      "createdBy": userId,
      "modifiedDate": new Date().toISOString(),
      "modifiedBy": userId
    };

    axios({
      method: 'post',
      url: config.base_url + '/api/Company/AddCompany',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    })
      .then(function (response) {
        setEditContentId(null);
        const index = CompaniesList.findIndex(company => company.companyId === editContentId);

        if (index >= 0) {
          const newCompanies = Array.from(CompaniesList);
          newCompanies[index] = data;
          setCompaniesList(newCompanies);
          setEditFormData({
            companyName: "",
            companyDescription: "",
            isActive: true,
            isDeleted: false,
          })
          getCompaniessList();
          swal("Good job!", "Successfully Updated", "success");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // setEditModal(false);
  };
  //Cencel button to same data
  const handleCancelClick = () => {
    setEditContentId(null);
  };

  return (
    <>
      <PageTitle activeMenu="Table" motherMenu="Post" />
      <div className="col-12">
        <Modal className="modal fade" show={addCard} onHide={setAddCard}>
          <div className="" role="document">
            <div className="">
              <form onSubmit={handleAddFormSubmit}>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">Add Company</h4>
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
                        <label className="text-black font-w500">company Name</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autocomplete="off"
                            name="companyName"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="companyName"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Description
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autocomplete="off"
                            name="companyDescription"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="Description"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      {/* <div className="form-group mb-3 flex align-item-center">
                        <label className=" mb-0 mr-5 text-black font-w500">
                          IsActive
                        </label>
                        <Switch id="isActive" onChange={handleAddFormSwitch} checked={addFormData.isActive} />
                      </div>
                      <div className="form-group mb-3 flex align-item-center">
                        <label className=" mb-0  mr-5 text-black font-w500">
                          IsDeleted
                        </label>
                        <Switch id="isDeleted" onChange={handleAddFormSwitch} checked={addFormData.isDeleted} />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
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
            <h4 className="card-title">Companies</h4>
            <div>
              <Link
                className="btn btn-primary shadow btn-xs sharp mr-2 add-user-btn"
                onClick={() => setAddCard(true)}
              >
                <i className="fa fa-plus">Add Companiess</i>
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
                        <th>Name</th>
                        <th>Description</th>
                        {/* <th>IsActive</th>
                        <th>IsDeleted</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log(CompaniesList, "test conte")}

                      {CompaniesList.map((content) => (
                        <>
                          {editContentId === content.companyId ? (
                            <Editable
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              //handleEditFormSwitch={handleEditFormSwitch}
                              handleCancelClick={handleCancelClick}
                            />
                          ) : (
                            <tr>
                              <td>{content.companyName}</td>
                              <td>{content.companyDescription}</td>
                              {/* <td>
                                <strong>{content.isActive.toString()}</strong>
                              </td>
                              <td>
                                <strong>{content.isDeleted.toString()}</strong>
                              </td> */}
                              <td>
                                <div className="d-flex">
                                  <Link
                                    className="btn btn-secondary shadow btn-xs sharp mr-2"
                                    onClick={(event) =>
                                      handleEditClick(event, content)
                                    }
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  <Link
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() =>
                                      handleDeleteClick(content.companyId)
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

export default Companies;
