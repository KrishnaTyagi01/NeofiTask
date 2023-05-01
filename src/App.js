import "./App.css";
import FormComponent from "./components/Form";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import { Box, Center, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Box minH="100vh" opacity={"0.9"} background="#0B0819" className="App">
      <Navbar />
      <Box mt={20}>
        <FormComponent />
      </Box>
    </Box>
  );
}

export default App;
