import { Button } from 'react-bootstrap';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js';
import HomeProducts from './HomeProducts.js'

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [allProducts, setAllProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [pages, setPages] = useState('');
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [currentProducts, setCurrentProducts] = useState('');

  // runs on the mount of the component
  // and on any update on the component
  useEffect(() => {});

  // runs once on the mount of the component
  useEffect(() => {}, [/*no dependancies*/]);

  // runs at the mount of the component
  // and on any change of the products
  // products change when keyword change and when database search
  // it sets the current page products & pages number & reset to the first page
  useEffect( () => {
    if (products) {
      setCurrentProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
      setPages(Math.ceil(products.length/productsPerPage));
      setCurrentPage(1);
    }
    else {
      setCurrentPage(0);
    }
  }, [products]);

  // runs at the mount of the component
  // and on any change of the products
  // keyword changes on the input filed change
  // it sets the products for all the table pages
  useEffect( () => {
    if (allProducts) {
      if (keyword) {
        setProducts(allProducts.filter((p) => {
          return p.name.includes(keyword) || p.description.includes(keyword) ||
                 p.id == keyword || p.price == keyword
        }));
      }
      else {
        setProducts(allProducts);
      }
    }
  },[keyword]);

  useEffect(() => {
    if (products) {
      setCurrentProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
    }
  }, [currentPage]);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    var response = await fetch("http://localhost:8000/api/search_products/"+keyword, {});
    response = await response.json();
    setLoading(false);
    setProducts(response);
    setAllProducts(response);
  }

  const clear = () => {
    setProducts(null);
    setAllProducts(null);
  }

  const previous = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage-1);
  }
  const next = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage+1);
  }

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h2 className="text-center">Search Products</h2>
          <div className="search-form my-4">
            <form className="py-3 text-center">
              <div className="form-group">
                <input onChange={ (e)=>setKeyword(e.target.value) }
                       type="text" name="name"
                       className="form-control form-control-lg"
                       placeholder="Search database and live results by (ID, Name, Description & Price)" />
              </div>
              <Button onClick={search} type="submit" variant="success" size="lg" className="m-1">Search database</Button>
              <Button onClick={clear} type="button" variant="warning" size="lg" className="m-1">Clear results</Button>
            </form>
          </div>
        </div>
        </div>
        {products ?
          <HomeProducts
              productsLenght={products.length}
              currentProducts={currentProducts}
              productsPerPage={productsPerPage}
              currentPage={currentPage}
              pages={pages}
              next={next}
              previous={previous}
            />
          : <h5 className="text-center">Please search the database to get your results!</h5>
        }
      </div>
    </>
  );
}


export default Home
