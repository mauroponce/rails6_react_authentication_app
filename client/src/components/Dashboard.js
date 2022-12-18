import React from 'react'

export default function Dashboard(props) {
  function handleLogout(e) {
    e.preventDefault();
    props.handleLogout();
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Hi {props.currentUser.email}</h2>
      <a href='#' onClick={handleLogout}>Logout</a>
    </div>
  )
}
