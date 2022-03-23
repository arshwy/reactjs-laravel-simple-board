import { Button } from 'react-bootstrap';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js';
import WarningModal from './WarningModal.js';
import EditModal from './EditModal.js';
import Toast from './Toast.js';
import AddForm from './AddForm.js';

const AddProduct = () => {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({name:"", description:"", price:"" });
  const [dataToEdit, setDataToEdit] = useState({name:"", description:"", price:"" });
  const [imageToEdit, setImageToEdit] = useState('');
  const [image, setImage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [actionProduct, setActionProduct] = useState();
  const [productToDelete, setProductToDelete] = useState('');
  const [productToEdit, setProductToEdit] = useState('');
  const [infoMessage, setInfoMessage] = useState(null);

  // for pagination
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [paginationLinks, setPaginationLinks] = useState([]); // array
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

  const getAll = async () => {
    var response = await fetch("http://localhost:8000/api/get_all_products/", {
      method:'POST',
    });
    response = await response.json();
    // console.log(response.products);
    setAllProducts(response.products);
  }

  const paginateAll = async () => {
    var response = await fetch(`http://localhost:8000/api/paginate_all_products/${productsPerPage}?page=${currentPage}`);
    response = await response.json();
    // these are the data comes from the laravel paginate function return
    setAllProducts(response.products.data);
    // setCurrentPage(response.products.currentPage);
    setLastPage(response.products.last_page);
    setPaginationLinks(response.products.links);
    setNextPage(response.products.next_page_url);
    setPreviousPage(response.products.prev_page_url);
    setTotalProducts(response.products.total);
    setFirstSerialOfCurrentPage(response.products.from);
    setLastSerialOfCurrentPage(response.products.to);
  }

  // getAll();
  useEffect(() => {
    // getAll();
    paginateAll();
    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
  }, [ infoMessage ]);

  useEffect(() => {
    paginateAll();
  }, [currentPage]);

  useEffect(() => {
    paginateAll();
    setCurrentPage(1);
  }, [productsPerPage]);

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
    var response = await fetch("http://localhost:8000/api/add_product", {
      method:'POST',
      body: product,
    });
    switch (response.status) {
      case 422:
        response = await response.json(); // Object contains the errors
        setFormErrors(response.errors);
        setTimeout(() => {
          setFormErrors({});
        }, 4000);
        break;
      case 200: case 201:
        response = await response.json();
        setInfoMessage('One product has been added successfully!');
        setFormData({name:"", description:"", price:"" });
        setImage('');
        break;
      default:
        break;
    }
  }

  const getProduct = async () => {
    var response = await fetch("http://localhost:8000/api/add_product_by_id", {
      method:'POST',
      body: JSON.stringify({product_id: allProducts[productToEdit].id}),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    });
    return response = await response.json();
  }

  const edit = (id) => {
    setProductToEdit(id);
    var product = allProducts.find(p => p.id == id);
    setDataToEdit(product);
    setImageToEdit(product.file_path);
  }

  const update = async () => {
    var p = allProducts.find(p => productToEdit == p.id);
    const product = new FormData();
    product.append('product_id', p.id);
    product.append('name', dataToEdit.name.toString().trim());
    product.append('description', dataToEdit.description.toString().trim());
    product.append('price', dataToEdit.price.toString().trim());
    product.append('image', imageToEdit);
    var response = await fetch("http://localhost:8000/api/update_product", {
      method:'POST',
      body: product,
    });
    switch (response.status) {
      case 422:
        response = await response.json(); // Object contains the errors
        setFormErrors(response.errors);
        setTimeout(() => {
          setFormErrors({});
        }, 4000);
        break;
      case 200: case 201:
        response = await response.json();
        setProductToEdit(null);
        setInfoMessage('One product has been updated successfully!');
        break;
      default:
        response = await response.json();
        console.log(response);
        break;
    }
  }

  const warning = (id) => {
    setProductToDelete(id);
  }

  const closeToast = (e) => {
    e.preventDefault();
    setInfoMessage(null);
  }

  const deleteApi = async () => {
    var p = allProducts.find(p => productToDelete == p.id);
    var response = await fetch("http://localhost:8000/api/delete_product", {
      method:'POST',
      body: JSON.stringify({product_id: p.id}),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    });
    response = await response.json();
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
                    <td><img src={"http://127.0.0.1:8000/"+p.file_path} width="120px;"/></td>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>{p.price} $</td>
                    <td>
                      <a onClick={()=>edit(p.id)} className="btn btn-warning btn-sm m-1">Edit</a>
                      <a onClick={()=>warning(p.id)} className="btn btn-danger btn-sm m-1">Delete</a>
                    </td>
                  </tr>
                )
              }</tbody>
            </table>
            <div>
              { previousPage &&
                <a href="" onClick={previous} className="mr-3">Previous</a>
              }
              { nextPage &&
                <a href="" onClick={next} className="mr-3">Next</a>
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
          onCancel={()=>setProductToEdit(null)}
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
