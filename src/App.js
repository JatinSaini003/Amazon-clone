import './Styling/App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div className="App">

      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
