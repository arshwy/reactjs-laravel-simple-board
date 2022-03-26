import React from 'react';


const EditModal = ({onImageChange, imageToEdit, handleEditChange, dataToEdit, formErrors, onUpdate, onCancel}) => {

  return (
      <div className="card" style={editModalStyle}>
        <div className="card-header">Update Product</div>
        <div className="card-body text-center" style={{
          padding:"20px",
        }}>
          <div>
            <div className="text-center"><img src={"http://127.0.0.1:8000/"+imageToEdit} width="300px" className="p-2" alt=""/></div>
            <div className="form-group">
              <label>Product Image</label>
              <input onChange={onImageChange}
                     type="file" name="imageToEdit" className="form-control p-1"/>
              {formErrors.image && <div className="text text-danger text-left">{formErrors.image}</div>}
            </div>
            <div className="form-group">
              <input onChange={handleEditChange} value={dataToEdit.name}
                     type="text" name="name" className="form-control" placeholder="Title"/>
              {formErrors.name && <div className="text text-danger text-left">{formErrors.name}</div>}
            </div>
            <div className="form-group">
              <textarea onChange={handleEditChange} value={dataToEdit.description}
                        type="text" name="description" rows="4" className="form-control" placeholder="Description"></textarea>
              {formErrors.description && <div className="text text-danger text-left">{formErrors.description}</div>}
            </div>
            <div className="form-group">
            <label>Price</label>
              <input onChange={handleEditChange} value={dataToEdit.price}
                     type="number" name="price" className="form-control" placeholder="$"/>
              {formErrors.price && <div className="text text-danger text-left">{formErrors.price}</div>}
            </div>
          </div>
        </div>
        <div className="card-footer border-0 bg-white text-center">
          <a href="/#" onClick={onUpdate} className="btn btn-warning m-1">Update</a>
          <a href="/#" onClick={onCancel} className="btn btn-secondary m-1">Cancel</a>
        </div>
      </div>
  );
}



const editModalStyle = {
  position:"fixed",
  top:"50%",
  left:"50%",
  transform: "translateX(-50%) translateY(-50%)",
  width:"500px",
}



export default EditModal
