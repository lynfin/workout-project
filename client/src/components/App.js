import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import WorkoutList from "./WorkoutList";
import RoutinesList from "./RoutinesList";
import NewWorkout from "./NewWorkout";
import UserPage from "./UserPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return (
    <div style={{
        minHeight: '100vh',
        backgroundSize: 'cover', 
        backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")', 
        padding: "100px"}}>
      <Login onLogin={setUser} />
    </div>)

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <UserPage user={user} setUser={setUser} />
        </Route>
        <Route exact path="/new">
          <NewWorkout user={user} />
        </Route>
        <Route exact path="/app-routines">
          <RoutinesList />
        </Route>
        <Route exact path="/app-workouts">
          <WorkoutList user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
