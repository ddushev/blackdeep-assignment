import { Box, Flex } from "@chakra-ui/react";
import Form from "./components/ui/Form";

function App() {

  return (
    <Flex justifyContent="center" alignItems="center" h="100vh" bg="#F5CF1A">
      <Box bg="white" p="50px" borderRadius="lg" boxShadow="5px 5px 5px 5px rgba(255, 50, 50, 0.2)">
        <Form />
      </Box>
    </Flex>
  )
}

export default App

