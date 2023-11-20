import logo from './logo.svg';
import './App.css';
import ContainerPage from './components/ContainerPage';
import 'react-bootstrap/dist/react-bootstrap'
import NavbarC from './components/NavbarC';
import FooterC from './components/FooterC';


function App() {
  return (
    <div className="App">
      <NavbarC/>
      <ContainerPage />
      <FooterC/>
    </div>
  );
}

export default App;
