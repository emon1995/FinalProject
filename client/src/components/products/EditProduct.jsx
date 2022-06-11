import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { singleProduct, updateProduct } from "../../utils/APIRoutes";
import { Link, useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  // const toastOptions = {
  //   position: "bottom-right",
  //   autoClose: 8000,
  //   pauseOnHover: true,
  //   draggable: true,
  //   theme: "dark",
  // };

  const { pId } = useParams();

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("product", product);
    formData.append("authorname", authorname);
    formData.append("productImage", fileName);

    // const products = {
    //   title,
    //   product,
    //   authorname,
    // };

    setTitle("");
    setProduct("");
    setAuthorname("");

    axios
      .put(`${updateProduct}${pId}`, formData)
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${singleProduct}${pId}`)
      .then((res) => [
        setTitle(res.data.title),
        setProduct(res.data.product),
        setAuthorname(res.data.authorname),
        setFileName(res.data.productImage),
      ])
      .catch((err) => console.log(err));
  }, [pId]);

  return (
    <FormContainer>
      <div className="container">
        <div className="brand">
          <h1>Update Product</h1>
          <span className="message">{message}</span>
        </div>
        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="authorname">Author Name</label>
            <input
              type="text"
              value={authorname}
              className="form-control"
              placeholder="Author Name"
              onChange={(e) => setAuthorname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              className="form-control"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product details">Product Details</label>
            <textarea
              className="form-control"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">Choose Product Image</label>
            <input
              type="file"
              filename="productImage"
              className="form-control"
              onChange={onChangeFile}
            />
          </div>
          <button type="submit" className="btn-primary">
            Product Update
          </button>
          <Link
            style={{ textAlign: "center", textDecoration: "none" }}
            to="/addProduct"
          >
            Back to Add Product
          </Link>
        </form>
      </div>
    </FormContainer>
    // <ToastContainer />
  );
};

const FormContainer = styled.div`
  height: 120vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  h1 {
    color: white;
    text-transform: uppercase;
    text-align: center;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  textarea {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default EditProduct;
