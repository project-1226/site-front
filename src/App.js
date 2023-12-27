import logo from './logo.svg';
import './App.css';
import HeaderPage from './components/HeaderPage';
import {Container} from 'react-bootstrap'
import RouterPage from './components/RouterPage';

function App() {
  return (
    <Container>
        <HeaderPage/>
        <RouterPage/>
    </Container>   
  );
}

export default App;
