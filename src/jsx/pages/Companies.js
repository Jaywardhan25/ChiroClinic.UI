import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import PageTitle from "../layouts/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompany,
  deleteCompany,
  fetchCompanies,
} from "../../store/actions/CompaniesActions";

const Companies = () => {
  const dispatch = useDispatch();
  const CompaniesList = useSelector((state) => state.companies.companies);
  const userId = useSelector((state) => state.auth.auth.data.UserId);
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  // Modal
  const [addCard, setAddCard] = useState(false);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  // delete data
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
        dispatch(deleteCompany(id)).then(() => dispatch(fetchCompanies()));
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = "";
    if (formData.name === "") {
      error = true;
      errorMsg = "Please fill companyName";
    }
    if (!error) {
      let data = {
        companyId: isEdit ? formData.companyId : 0,
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        createdDate: new Date().toISOString(),
        createdBy: userId,
        modifiedDate: new Date().toISOString(),
        modifiedBy: userId,
      };
      console.log({ data });

      dispatch(addCompany(data))
        .then(function (response) {
          swal(
            "Good job!",
            `Successfully ${isEdit ? "Updated" : "Added"}`,
            "success"
          );
          setAddCard(false);

          setFormData({
            companyName: "",
            companyDescription: "",
            isActive: true,
            isDeleted: false,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  const handleEditClick = (event, content) => {
    setIsEdit(true);
    const formData = {
      companyId: content.companyId,
      companyName: content.companyName,
      companyDescription: content.companyDescription,
    };
    setFormData(formData);
    setAddCard(true);
  };

  return (
    <>
      <div className="col-12">
        <Modal className="modal fade" show={addCard} onHide={setAddCard}>
          <div className="" role="document">
            <div className="">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">
                    {isEdit ? "Update" : "Add"} Company
                  </h4>
                  <button
                    type="button"
                    className="btn-close btn btn-danger"
                    onClick={() => {
                      setAddCard(false);
                    }}
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
                          Company Name
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="companyName"
                            value={formData.companyName}
                            required="required"
                            onChange={handleInputChange}
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
                            autoComplete="off"
                            name="companyDescription"
                            value={formData.companyDescription}
                            required="required"
                            onChange={handleInputChange}
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
                    {isEdit ? "Update" : "Add"}
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
              <button
                className="btn btn-primary shadow btn-xs sharp mr-2 add-user-btn"
                onClick={() => {
                  setIsEdit(false);
                  setAddCard(true);
                }}
              >
                <i className="fa fa-plus">Add Companiess</i>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
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
                    {Array.isArray(CompaniesList)
                      ? CompaniesList.map((content) => (
                          <tr key={content.companyId}>
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
                                <button
                                  type="button"
                                  className="btn btn-secondary shadow btn-xs sharp mr-2"
                                  onClick={(event) =>
                                    handleEditClick(event, content)
                                  }
                                >
                                  <i className="fa fa-pencil"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger shadow btn-xs sharp"
                                  onClick={() =>
                                    handleDeleteClick(content.companyId)
                                  }
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : null}
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

export default Companies;
