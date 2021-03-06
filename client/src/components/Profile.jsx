import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    async function myData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      if (data) {
        setUserName(data.username);
        setUserImage(data.avatarImage);
        setUserEmail(data.email);
      }
    }
    myData();
  }, []);

  return (
    <Container>
      <div className="profile">
        <div className="avatar">
          <img
            className="imges"
            src={`data:image/svg+xml;base64,${userImage}`}
            alt="avatar"
          />
          <h2 className="username">User Name: {userName}</h2>
          <h2 className="email">User Email: {userEmail}</h2>
          <div className="button" style={{ marginBottom: "2rem" }}>
            <div>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "blue",
                  padding: "1rem 2rem",
                  borderRadius: "5px",
                  marginRight: "5px",
                  alignItems: "center",
                }}
                to="/addProduct"
              >
                Sell
              </Link>
            </div>
            <div>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "red",
                  padding: "1rem 2rem",
                  borderRadius: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                to="/buy"
              >
                Buy
              </Link>
            </div>
          </div>
          <Link
            style={{
              textDecoration: "none",
              marginLeft: "115px",
              marginTop: "1rem",
            }}
            to="/"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  background-color: #131324;

  .profile {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    height: 70vh;
    width: 50vw;
    .avatar {
      img {
        margin-left: 7rem;
        height: 7rem;
        max-inline-size: 100%;
      }
      .username {
        margin-top: 2rem;
        h2 {
          color: white;
        }
      }
      .email {
        margin-top: 1rem;
        h2 {
          color: white;
        }
      }
      .button {
        margin-top: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

// const Button = styled.button`
//   /* Adapt the colors based on primary prop */
//   background: ${(props) => (props.primary ? "palevioletred" : "tomato")};
//   color: ${(props) => (props.primary ? "white" : "white")};

//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
//   cursor: "pointer"
// `;

export default Profile;
