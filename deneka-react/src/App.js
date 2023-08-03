import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/dashboard">Company</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reports">Reports</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/settings">Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
      <header>
        <h1 className="mt-4">Welcome to Company Dashboard</h1>
      </header>
      <main>
        <p className="lead">This is your starting point to navigating the company dashboard.</p>
      </main>
    </div>
  );
}

export default App;
