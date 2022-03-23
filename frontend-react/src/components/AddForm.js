import { Button } from 'react-bootstrap';


const AddForm = ({ setImage, formData, infoMessage, formErrors, handleChange, add }) => {

  return(
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-10">
        <h2 className="text-center">Add Product</h2>
        <div className="add-form my-5">
          <form className="py-3" encType="multipart/form-data">
            { infoMessage && <p className="alert alert-success py-2">{infoMessage}</p> }
            <div className="form-group">
              <label>Product Image</label>
              <input onChange={setImage}
                     type="file" name="image" className="form-control p-1"/>
              {formErrors.image && <div className="text text-danger text-left">{formErrors.image}</div>}
            </div>
            <div className="form-group">
              <input onChange={handleChange} value={formData.name}
                     type="text" name="name" className="form-control" placeholder="Title"/>
              {formErrors.name && <div className="text text-danger text-left">{formErrors.name}</div>}
            </div>
            <div className="form-group">
              <textarea onChange={handleChange} value={formData.description}
                        type="text" name="description" rows="4" className="form-control" placeholder="Description"></textarea>
              {formErrors.description && <div className="text text-danger text-left">{formErrors.description}</div>}
            </div>
            <div className="form-group">
            <label>Price</label>
              <input onChange={handleChange} value={formData.price}
                     type="number" name="price" className="form-control" placeholder="$"/>
              {formErrors.price && <div className="text text-danger text-left">{formErrors.price}</div>}
            </div>
            <Button onClick={add} type="submit"
                    variant="success" size="lg">Add</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddForm
