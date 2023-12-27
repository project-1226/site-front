import HeaderPage from "./components/HeaderPage";
import RouterPage from "./components/RouterPage";
import FooterPage from "./components/FooterPage";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <HeaderPage/>
      <RouterPage/>
      <FooterPage/>
    </Container>
  );
}

export default App;
