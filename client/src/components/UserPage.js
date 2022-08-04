import React from "react";
import { Button } from "../styles";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserPage = ({ user }) => {

  return (
    <div style={{width: '100%', background: 'black', display: 'flex', overflow: 'hidden'}}> 
        <div style={{ 
          height: '100vh',
          background: '#d3d3d3',
          minWidth: '400px',
          textAlign: 'justify',
          padding:'10px',
          overflowY: 'scroll'
        }}
        >
          <h2 style={{ textAlign: "center" }}>{user.username}</h2>
          <img
            style={{ width: '100%'}}
            src={user.image_url}
            alt="img"
          ></img>
          <h3 style={{ fontSize: '18px' }}>{user.bio}</h3>
        </div>
        <div >
          <img style={{height: '100vh'}} src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3ltfGVufDB8fDB8fA%3D%3D&w=1000&q=80"></img>
        </div>
    </div>
  );
};

export default UserPage;
