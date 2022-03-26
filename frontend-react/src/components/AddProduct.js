import React, { useState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from './Header.js';
import WarningModal from './WarningModal.js';
import EditModal from './EditModal.js';
import Toast from './Toast.js';
import AddForm from './AddForm.js';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({name:"", description:"", price:"" });
  const [dataToEdit, setDataToEdit] = useState({name:"", description:"", price:"" });
  const [imageToEdit, setImageToEdit] = useState('');
  const [image, setImage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState('');
  const [productToEdit, setProductToEdit] = useState('');
  const [infoMessage, setInfoMessage] = useState(null);
  const [firstMount, setFirstMount] = useState(true);

  // for pagination
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  // const [paginationLinks, setPaginationLinks] = useState([]); // array
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [firstSerialOfCurrentPage, setFirstSerialOfCurrentPage] = useState(null); // serial of first product in the current page
  const [lastSerialOfCurrentPage, setLastSerialOfCurrentPage] = useState(null); // serial of the last product in the current page

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

  const paginateAll = () => {
    console.log('request');
    axios.get(`/api/paginate_all_products/${productsPerPage}?page=${currentPage}`)
    .then(response => {
      var data = response.data;
      switch (data.status) {
        case 422:
          console.log("error status 422 in switch", response);
          break;
        case 201:
          setAllProducts(data.products.data);
          setLastPage(data.products.last_page);
          // setPaginationLinks(data.products.links);
          setNextPage(data.products.next_page_url);
          setPreviousPage(data.products.prev_page_url);
          setTotalProducts(data.products.total);
          setFirstSerialOfCurrentPage(data.products.from);
          setLastSerialOfCurrentPage(data.products.to);
          break;
        default:
          console.log("default status in axios switch: ", response);
          break;
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    // if it is the first mount dont work
    !firstMount && paginateAll();
  }, [currentPage]);

  useEffect(() => {
    // if it is the first mount dont work
    !firstMount && paginateAll();
    setCurrentPage(1);
  }, [productsPerPage]);

  useEffect(() => {
    // if it is the first mount dont work
    paginateAll();
    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
  }, [ infoMessage ]);

  useEffect(() => {
    // this renders the pagonation request at the first time
    // and tells the other useEffet to work
    setFirstMount(false);
    paginateAll();
  }, []);

  const next = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage+1);
  }

  const previous = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage-1);
  }

  const add = async (e) => {
    e.preventDefault();
    const product = new FormData();
    product.append('name', formData.name.toString().trim());
    product.append('description', formData.description.toString().trim());
    product.append('price', formData.price.toString().trim());
    product.append('image', image);
    axios.post(`/api/add_product`, product)
    .then(response => {
      response = response.data;
      switch (response.status) {
        case 422:
          setFormErrors(response.errors);
          setTimeout(() => {
            setFormErrors({});
          }, 4000);
          break;
        case 200: case 201:
        console.log(response.product);
          setInfoMessage('One product has been added successfully!');
          setFormData({name:"", description:"", price:"" });
          setImage('');
          break;
        default:
          console.log('Error in switch status');
          break;
      }
    })
    .catch( error => {
      console.log(error);
    });
  }

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
    axios.post(`/api/update_product`, product)
    .then( response => {
      var data = response.data;
      switch (data.status) {
        case 422:
          setFormErrors(data.errors);
          setTimeout(() => {
            setFormErrors({});
          }, 4000);
          break;
        case 201:
          setProductToEdit(null);
          setInfoMessage('One product has been updated successfully!');
          break;
        default:
          console.log(data);
          break;
      }
    })
    .catch( error => {

    });
  }

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
    axios.post(`api/delete_product`, data);
    setProductToDelete(null);
    setInfoMessage('One product has been deleted successfully!');
  }

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
              <tbody>{
                allProducts.map((p, i) =>
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
              }</tbody>
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
