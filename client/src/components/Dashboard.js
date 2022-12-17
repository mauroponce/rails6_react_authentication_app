import React from 'react'

export default function Dashboard(props) {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Logged in: {props.currentUser ? 'Yes' : 'No'}</h2>
    </div>
  )
}
