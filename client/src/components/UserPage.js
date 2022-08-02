import React from "react";
import { Button } from "../styles";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserPage = ({ user }) => {
  const handleBrowseClick = () => {
    fetch("/routines")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const handleWorkoutClick = () => {
    fetch("/exercises")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const handleCreateClick = () => {
    fetch("/exercises")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}> Welcome, {user.username} !</h2>
      <img
        style={{
          height: "400px",
          width: "400px",
          display: "inline-block",
          marginLeft: "510px",
          marginRight: "510px",
        }}
        src={user.image_url}
        alt="img"
      ></img>
      <h3
        style={{
          fontStyle: "bold",
          textDecoration: "underline",
          fontSize: "24px",
          textAlign: "center",
        }}
      >
        {" "}
        Bio{" "}
      </h3>
      <h4 style={{ textAlign: "center" }}>{user.bio}</h4>
      <Button as={Link} to="/routines">
        Browse Exercises
      </Button>
      <Button as={Link} to="/workouts">
        My Workouts
      </Button>
      <Button as={Link} to="/new">
        Create Workout
      </Button>
    </>
  );
};

export default UserPage;