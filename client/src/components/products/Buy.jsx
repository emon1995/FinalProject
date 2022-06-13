import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { showProduct } from "../../utils/APIRoutes";
import loader from "../../assets/loader.gif";
import { BiArrowBack } from "react-icons/bi";

const Buy = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(showProduct)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  });
  
  return (
    <>
      <LinkTag>
        <Link
          style={{ textAlign: "center", textDecoration: "none" }}
          to="/profile"
        >
          <BiArrowBack />
          Back to Profile
        </Link>
      </LinkTag>
      <Maincontainer>
        <div className="container">
          {!posts.length ? (
            <img src={loader} alt="loading..." />
          ) : (
            posts.map((post, key) => {
              return (
                <div className="card" key={key}>
                  <div className="card-header">
                    <img src={`/images/${post.productImage}`} alt="rover" />
                  </div>
                  <div className="card-body">
                    <span className="tag tag-teal">৳ {post.price}</span>
                    <h4>{post.title}</h4>
                    <p>{post.product}</p>
                    <div className="d-flex" style={{ alignItems: "center" }}>
                      <div className="bg">
                        <Link
                          className="btn btn-success p-1"
                          to={`/${post.username}`}
                          style={{
                            textDecoration: "none",
                            color: "white",
                            backgroundColor: "red",
                            padding: "1rem",
                            borderRadius: "5px",
                            marginLeft: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {" "}
                          Biding Product
                        </Link>
                      </div>
                    </div>
                    <div className="user">
                      <img
                        src={`data:image/svg+xml;base64,${post.userImage}`}
                        alt="userImage"
                      />
                      <div className="user-info">
                        <h5>{post.username}</h5>
                        <small>{post.updatedAt}</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Maincontainer>
    </>
  );
};

const LinkTag = styled.div`
  text-align: center;
  background-color: #131324;
  padding: 10px;
`;

const Maincontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: #10182f;
  background-color: #131324;
  .container {
    display: flex;
    width: 1040px;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .card {
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: 300px;
  }
  .card-header img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    min-height: 250px;
  }

  .tag {
    background: #cccccc;
    border-radius: 50px;
    font-size: 12px;
    margin: 0;
    color: #fff;
    padding: 2px 10px;
    text-transform: uppercase;
    cursor: pointer;
  }
  .tag-teal {
    background-color: #47bcd4;
  }
  .tag-purple {
    background-color: #5e76bf;
  }
  .tag-pink {
    background-color: #cd5b9f;
  }

  .card-body p {
    font-size: 13px;
    margin: 0 0 40px;
  }
  .user {
    display: flex;
    margin-top: 50px;
  }

  .user img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .user-info h5 {
    margin: 0;
  }
  .user-info small {
    color: #545d7a;
  }
`;

export default Buy;
