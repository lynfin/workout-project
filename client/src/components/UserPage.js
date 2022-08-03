import React from "react";
import { Button } from "../styles";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserPage = ({ user }) => {

  return (
    <div style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      backgroundColor: "white",
      maxWidth: '400px',
      margin: 'auto',
      textAlign: 'justify',
      padding:'10px'}}
    >
      <h2 style={{ textAlign: "center" }}>{user.username}</h2>
      <img
        style={{ width: "100%" }}
        src={user.image_url}
        alt="img"
      ></img>
      <h3 style={{ fontSize: '18px' }}>{user.bio}</h3>
    </div>
  );
};

export default UserPage;
