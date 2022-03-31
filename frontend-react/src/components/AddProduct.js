import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    createProduct,
    deleteProduct,
    getProducts,
    paginateProducts,
    updateProduct
  } from '../redux/actions'

import Header from './Header.js';
import WarningModal from './WarningModal.js';
import EditModal from './EditModal.js';
import Toast from './Toast.js';
import AddForm from './AddForm.js';
import axios from 'axios';

const AddProduct = () => {
  // const loading = useSelector(state => state.paginateProducts.loading)
  const paginateState = useSelector(state => state.paginateProducts);
  const loading = useSelector(state => state.paginateProducts.loading);
  const products = useSelector(state => state.paginateProducts.products);
  const allProducts = useSelector(state => state.paginateProducts.products);
  const currentPage = useSelector(state => state.paginateProducts.current_page);
  const lastPage = useSelector(state => state.paginateProducts.last_page);
  const nextPage = useSelector(state => state.paginateProducts.next_page_url);
  const previousPage = useSelector(state => state.paginateProducts.prev_page_url);
  const totalProducts = useSelector(state => state.paginateProducts.total);
  const firstSerialOfCurrentPage = useSelector(state => state.paginateProducts.from);
  const lastSerialOfCurrentPage = useSelector(state => state.paginateProducts.to);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const addState = useSelector(state => state.createProduct);
  const updateState = useSelector(state => state.updateProduct);
  const deleteState = useSelector(state => state.deleteProduct);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({name:"", description:"", price:"" });
  const [dataToEdit, setDataToEdit] = useState({name:"", description:"", price:"" });
  const [imageToEdit, setImageToEdit] = useState('');
  const [image, setImage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [productToDelete, setProductToDelete] = useState('');
  const [productToEdit, setProductToEdit] = useState('');
  const [infoMessage, setInfoMessage] = useState(null);
  const [firstMount, setFirstMount] = useState(true);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleEditChange = (e) => {
    setDataToEdit({
      ...dataToEdit,
      [e.target.name]: e.target.value
    });
  }


  useEffect(() => {
    // if it is the first mount dont work
    !firstMount && dispatch(paginateProducts({productsPerPage, currentPage}));
  }, [productsPerPage]);

  useEffect(() => {
    // if it is the first mount dont work
    dispatch(paginateProducts({productsPerPage, currentPage}));
    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
  }, [ infoMessage ]);

  useEffect(() => {
    // this renders the pagonation request at the first time
    // and tells the other useEffet to work
    setFirstMount(false);
    dispatch(paginateProducts({productsPerPage, currentPage}));
  }, []);

  const next = (e) => {
    e.preventDefault();
    var nextPageNum = currentPage + 1;
    dispatch(paginateProducts({productsPerPage, currentPage: nextPageNum}));
  }

  const previous = (e) => {
    e.preventDefault();
    var previousPageNum = currentPage - 1;
    dispatch(paginateProducts({productsPerPage, currentPage: previousPageNum}));
  }

  const add = async (e) => {
    e.preventDefault();
    const product = {
      'name': formData.name.toString().trim(),
      'description': formData.description.toString().trim(),
      'price': formData.price.toString().trim(),
      'image': image
    }
    dispatch(createProduct(product));
  }
  useEffect(()=>{
    if (addState.success) {
      setInfoMessage('One product has been created successfully!');
    }
    else {
      if (!addState.loading && addState.validationError) {
        setFormErrors(addState.error);
        setTimeout(() => {
          setFormErrors({});
        }, 5000);
      }
      else if (!addState.loading && !addState.validationError) {
        setFormData({name:"", description:"", price:"" });
        setImage('');
      }
    }
  }, [addState.loading, addState.success]);


  const edit = (id) => {
    setProductToEdit(id);
    var product = allProducts.find(p => p.id === id);
    setDataToEdit(product);
    setImageToEdit(product.file_path);
  }

  const cancelEdit = (e) => {
    e.preventDefault();
    setProductToEdit(null);
  }

  const update = async (e) => {
    e.preventDefault()
    var p = allProducts.find(p => productToEdit === p.id);
    const product = new FormData();
    product.append('product_id', p.id);
    product.append('name', dataToEdit.name.toString().trim());
    product.append('description', dataToEdit.description.toString().trim());
    product.append('price', dataToEdit.price.toString().trim());
    product.append('image', imageToEdit);
    dispatch(updateProduct(product));
  }
  useEffect(() => {
    if (updateState.success) {
      setProductToEdit(null);
      setInfoMessage('One product has been updated successfully!');
      setDataToEdit({name:"", description:"", price:"" });
      setImageToEdit('');
    }
    else if (!updateState.loading && updateState.validationError) {
      setFormErrors(updateState.error);
      setTimeout(() => {
        setFormErrors({});
      }, 5000);
    }
  }, [updateState.loading, updateState.success]);

  const warning = (id) => {
    setProductToDelete(id);
  }

  const closeToast = (e) => {
    e.preventDefault();
    setInfoMessage(null);
  }

  const deleteApi = async () => {
    var p = allProducts.find(p => productToDelete === p.id);
    var data = {product_id: p.id};
    dispatch(deleteProduct(data));
    setProductToDelete(null);

  }
  useEffect(() => {
    if (deleteState.success) {
      setInfoMessage('One product has been deleted successfully!');
    }
    else{
      setFormErrors(deleteState.error);
      setTimeout(() => {
        setFormErrors({});
      }, 5000);
    }
  }, [deleteState.loading, deleteState.success]);

  return (
    <>
      <Header />

      <div className="container-fluid py-5">

        <AddForm
            setImage={(e)=>setImage(e.target.files[0])}
            infoMessage={infoMessage}
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            add={add}
        />

        <div className="row justify-content-center">
          <div className="product-container col-lg-8 col-md-10 col-sm-12">
            <h4 className="text-center">All Products ({totalProducts})</h4>
            <div className="my-3">
              <span className="my-3 mr-3">Results in this page ({lastSerialOfCurrentPage-firstSerialOfCurrentPage+1})</span>
              <span className="my-3 mr-3">
                Current Page ({currentPage} of {lastPage})
              </span>
              <label>Products Per Page</label>&nbsp;
              (<select onChange={(e)=>setProductsPerPage(e.target.value)} style={{outline:"none", border:"none"}}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>)
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">id</th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price $</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{ loading ?
                  <tr>
                    <td colSpan="7" className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr> :
                  products.map((p, i) =>
                    <tr key={p.id}>
                      <th scope="row">{firstSerialOfCurrentPage+i}</th>
                      <td>PID-{p.id}</td>
                      <td><img src={"http://127.0.0.1:8000/"+p.file_path} width="120px;" alt=""/></td>
                      <td>{p.name}</td>
                      <td>{p.description}</td>
                      <td>{p.price} $</td>
                      <td>
                        <button onClick={()=>edit(p.id)} className="btn btn-warning btn-sm m-1">Edit</button>
                        <button onClick={()=>warning(p.id)} className="btn btn-danger btn-sm m-1">Delete</button>
                      </td>
                    </tr>)
                }
            </tbody>
            </table>
            <div>
              { previousPage &&
                <a href="/#" onClick={previous} className="mr-3">Previous</a>
              }
              { nextPage &&
                <a href="/#" onClick={next} className="mr-3">Next</a>
              }
            </div>
          </div>
        </div>

        {productToDelete && <WarningModal
            allProducts={allProducts}
            productToDelete={productToDelete}
            onCancel={()=>setProductToDelete(null)}
            onDelete={deleteApi}
         />}

        {productToEdit && <EditModal
          onImageChange={(e)=>setImageToEdit(e.target.files[0])}
          imageToEdit={imageToEdit}
          handleEditChange={handleEditChange}
          dataToEdit={dataToEdit}
          formErrors={formErrors}
          onUpdate={update}
          onCancel={cancelEdit}
        />}

          {infoMessage && <Toast
            infoMessage={infoMessage}
            onClose={closeToast}
          />}

      </div>
    </>
  );
}





export default AddProduct
