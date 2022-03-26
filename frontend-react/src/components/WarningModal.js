import React from 'react';



const WarningModal = ({allProducts, productToDelete, onCancel, onDelete}) => {

  return (
    <div className="card text-center" style={deleteModalStyle}>
      <div className="card-header">Delete a product ?</div>
      <div className="card-body" style={{ padding:"20px" }}>
        Are you sure you want to delete this product?
        <div className="text-center pt-4">
          with id: {allProducts.find(p => productToDelete === p.id).id} <br/>
        Titled: {allProducts.find(p => productToDelete === p.id).name}
        </div>
      </div>
      <div className="card-footer border-0 bg-white text-center">
        <button onClick={onDelete} className="btn btn-warning m-1">Yes</button>
        <button onClick={onCancel} className="btn btn-secondary m-1">No</button>
      </div>
    </div>
  );
}


const deleteModalStyle = {
  position:"fixed",
  top:"50%",
  left:"50%",
  transform: "translateX(-50%) translateY(-50%)",
}


export default WarningModal
