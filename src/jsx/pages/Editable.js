import React from 'react';

const Editable = ({editFormData, handleEditFormChange, handleCancelClick}) =>{
    return(
        <>
            <tr>
				<td></td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a firstName ..." name="firstName" 
                        value={editFormData.firstName}
                        onChange={handleEditFormChange}
                    />
                </td>   
                <td>
                    <input type="text" required = "required" placeholder = "Enter a lastName ..." name="lastName" 
                        value={editFormData.lastName}
                        onChange={handleEditFormChange}
                    />
                </td>   
                
				<td>
                    <input type="text" required = "required" placeholder = "Enter a phone" name="phone"
                        value={editFormData.phone}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="text" required = "required" placeholder = "Enter a email" name="email"
                        value={editFormData.email}
                        onChange={handleEditFormChange}
                    />
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