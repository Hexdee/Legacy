import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import logo from "../../src/icons/logo.svg";

const SuccessMessage = ({ handleProceed }) => {
  const imgLink = "https://pngimg.com/uploads/confetti/confetti_PNG86957.png";
  return (
    <Box padding="30px 80px">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" justifyContent="space-around">
          <Image w="60px" src={logo} alt="logo" />
          <Text cursor="pointer" ml="100px" _hover={{ color: "brand.primary" }}>
            About us
          </Text>
          <Text cursor="pointer" ml="100px" _hover={{ color: "brand.primary" }}>
            How it works
          </Text>
        </Flex>
        <CustomButton
          bg="brand.primary"
          color="brand.white"
          hoverColor="brand.yellow"
        >
          Authenticate
        </CustomButton>
      </Flex>

      <Box m="80px auto" w="80%">
        <Image src={imgLink} alt="congrats" w="200px" m="20px auto" />
        <Text fontSize="40px" mt="60px" textAlign="center">Congratulations</Text>
        <Text textAlign="center" fontSize="16px" color="brand.primary" w="30%" m="20px auto">
          You have successfully updated your check in interval and you have successfully checked in today
        </Text>
      </Box>

      <CustomButton m="0 auto" d="flex" onClick={handleProceed}>Go Home</CustomButton>
    </Box>
  );
};

export default SuccessMessage;
