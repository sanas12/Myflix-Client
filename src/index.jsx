import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const App = () => {
  return (
    <Container style={{ border: "1px solid red" }}>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
