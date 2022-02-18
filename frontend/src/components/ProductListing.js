import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  const [data, getData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const fetchData = async () => {
    const res = await fetch("http://localhost:8000/products");
    const response = await res.json();
    getData(response);
    console.log(response);
  };
  const deleteProduct = async (productid) => {
    const del = await fetch(
      `http://localhost:8000/deleteproduct/${productid}`,
      {
        method: "delete",
      }
    );
    alert("deleted");
    fetchData();
  };
  const getProductById = async (productid) => {
    navigate(`/update/${productid}`);
  };
  const searchHandler = async(e)=>{
    const key=e.target.value;
    console.warn(key)
    const response = await fetch(`http://localhost:8000/search/${key}`)
    const resp = await response.json();
    getData(resp)

  }
  return (
    <>
      <div className="container">
        <h1 className="tableHead">Product List</h1>
        <div className="search">
        <input type="text" className="search" placeholder="Search Items"  onChange={searchHandler}/>
        </div>
        <table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Product Price</th>
              <th>Product company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? data.map((data,id) => {
              const { name, category, price, company } = data;
              return (
                <tr>
                  <td>{id +1}.</td>
                  <td>{name}</td>
                  <td>{category}</td>
                  <td>{price}</td>
                  <td>{company}</td>
                  <td>
                    <button onClick={() => deleteProduct(data._id)}>
                      Delete
                    </button>
                    <button onClick={() => getProductById(data._id)}>
                      Update
                    </button>
                  </td>
                </tr>
              );
            }):(<tr className="notFound">No Product Found.</tr>)}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductListing;
