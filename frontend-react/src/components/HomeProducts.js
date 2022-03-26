import React from 'react';




const HomeResults = ({productsLenght, currentProducts, productsPerPage, currentPage, pages, next, previous}) => {

  return (
    <>
      <div className="row justify-content-center">
      <div className="product-container col-lg-8 col-md-10 col-sm-12">
        <div>
          <span className="my-3 mr-3">Total Results ({productsLenght})</span>
          <span className="my-3 mr-3">Results in one page ({productsPerPage})</span>
          <span className="my-3 mr-3">
            Current Page ({currentPage} of {pages})
          </span>
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
            </tr>
          </thead>
          <tbody>{currentProducts && currentProducts.map( (p, i) =>
              <tr key={p.id}>
                <th scope="row">{i+1}</th>
                <td>PID-{p.id}</td>
                <td><img src={`http://127.0.0.1:8000/${p.file_path}`} width="120px;" alt=""/></td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price} $</td>
              </tr>
          )}</tbody>
        </table>
        <div>
          { currentPage > 1 &&
            <a href="/#" onClick={previous} className="mr-3">Previous</a>
          }
          { (currentPage < pages) &&
            <a href="/#" onClick={next} className="mr-3">Next</a>
          }
        </div>
      </div>
      </div>
    </>
  );

}



export default HomeResults
