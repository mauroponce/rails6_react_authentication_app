import logo from './logo.svg';
import './App.css';

async function checkLoggedIn(event) {
  event.preventDefault();
  const response = await fetch('http://localhost:4000/sessions/logged_in')
  response.json().then((data) => {
    alert('Logged in: ' + data.logged_in)
  })  
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button onClick={checkLoggedIn}>
            Is Logged in?
          </button>
        </a>
      </header>
    </div>
  );
}

export default App;
