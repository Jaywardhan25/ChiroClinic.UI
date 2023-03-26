import React from 'react';
import ReactSwitch from 'react-switch';

const Editable = ({editFormData, handleEditFormChange, handleCancelClick, handleEditFormSwitch}) =>{
    return(
        <>
            <tr>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a Name ..." name="companyName" 
                        value={editFormData.companyName}
                        onChange={handleEditFormChange}
                    />
                </td>   
                <td>
                    <input type="text" required = "required" placeholder = "Enter a Description ..." name="companyDescription" 
                        value={editFormData.companyDescription}
                        onChange={handleEditFormChange}
                    />
                </td>   
                
                <td>
                    <ReactSwitch id="isActive" onChange={handleEditFormSwitch} checked={editFormData.isActive} />
                </td>
                <td>
                    <ReactSwitch id="isDeleted" onChange={handleEditFormSwitch} checked={editFormData.isDeleted} />
                </td>
                <td>	
					<div className="d-flex">
						<button className="btn btn-warning shadow btn-xs sharp mr-1" type="submit"><i className="las la-check-circle scale5"></i></button>
						<button className="btn btn-danger shadow btn-xs sharp " type="button" onClick={handleCancelClick}>
							<i className="las la-times-circle scale5"></i>
						</button>
					</div>
                </td>
            </tr>
        </>
    )
}
export default Editable;