import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Hello World</div>} />
        <Route path="/signup" element={ <SignupPage/> } />
        <Route path="/signin" element={ <SigninPage/> } />
        {/* <Route path="/verify" element={ <VerificationPage/> } /> */}

      </Routes>
    </Router>

  );
}

export default App;
