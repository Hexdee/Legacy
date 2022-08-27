import { Box, Flex, Image, Text } from "@chakra-ui/react";
import logo from '../../src/icons/logo.svg';
import CustomButton from "../common/CustomButton";
import TextInput from "../common/TextInput";

const Form = ({ handleSecureNow }) => {
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

      <Box textAlign="center" border="1px solid #7000FF" p="15px" w="40%" borderRadius="10px" margin="80px auto">
        <Text color="brand.primary" fontSize="30px">Fill in the form<br/>below appropraitely</Text>
        <Text color="brand.dark" fontSize="14px" mt="10px">
            This allows your next of kin to inherits your wallets<br/>assets when you're
            no more alive.
        </Text>
        <Box m="40px auto" w="80%" fontSize="14px">
            <form>
                <TextInput
                    label="Full name"
                    placeholder="Enter your full name"
                    type="text"
                />

                <TextInput
                    label="Wallet Address"
                    placeholder="Enter your wallet address"
                    type="text"
                />
                   <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                />

                <TextInput
                    label="Name of your next of kin"
                    placeholder="Enter your next of kin"
                    type="text"
                />

                <TextInput
                    label="Next of kin wallet address"
                    placeholder="Enter your next of kin wallet address"
                    type="text"
                />
                <TextInput
                    label="Next of kin email address"
                    placeholder="Enter your next of email address"
                    type="email"
                />
                <CustomButton mt="20px" w="100%" bg="brand.primary" color="brand.white" hoverColor="brand.yellow" onClick={handleSecureNow}>Secure Now</CustomButton>
            </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
