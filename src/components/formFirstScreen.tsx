import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

function FormFirstScreen() {
  return (
    <Box maxW="480px">
      <form>
        <FormControl mb="20px" isRequired>
          <FormLabel>First Name:</FormLabel>
          <Input type="text" name="firstName" />
        </FormControl>
        <FormControl mb="20px" isRequired>
          <FormLabel>Last Name:</FormLabel>
          <Input type="text" name="lastName" />
        </FormControl>
        <FormControl mb="20px" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" />
        </FormControl>
        <FormControl mb="20px" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" name="confirmPassword" />
        </FormControl>
        <FormControl mb="20px" isRequired>
          <FormLabel>Interests:</FormLabel>
          <Flex direction="column">
            <Checkbox id="sports" name="interests" value="Sports">Sports</Checkbox>
            <Checkbox id="music" name="interests" value="Music">Music</Checkbox>
            <Checkbox id="dancing" name="interests" value="Dancing">Dancing</Checkbox>
            <Checkbox id="games" name="interests" value="Games">Games</Checkbox>
          </Flex>
        </FormControl>
        <Button type="submit">Next</Button>
      </form>
    </Box>
  )
}

export default FormFirstScreen