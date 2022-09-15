import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import logo from "../../src/assets/icons/logo.svg";
import { close, hamburger } from "../assets/svgs/svg";
import CustomButton from "../common/CustomButton";
import { toaster } from "evergreen-ui";

const Navbar = () => {
  const [openNavBar, setOpenNavBar] = useState(false);
  const [user, setUser] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUser(getUser);
}, [user]);

    const getUser = localStorage.getItem('legacy_user')

  const connect = async () => {
    setIsLoading(true);
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        localStorage.setItem('legacy_user', address);
        setUser(address);
        setIsLoading(false);
    } catch(error) {
        console.log(error);
        toaster.danger("An error occured!");
        setIsLoading(false);
    }
}
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        display={{ base: "block", lg: "flex" }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-around"
          display={{ base: "none", lg: "flex" }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Link to="/">
              <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
            </Link>
            <Box
              onClick={() => setOpenNavBar(!openNavBar)}
              display={{ base: "block", lg: "none" }}
            >
              {openNavBar ? close : hamburger}
            </Box>
          </Flex>
          <Text
            cursor="pointer"
            ml={{ base: "0", lg: "100px" }}
            mt={{ base: "20px", lg: "0" }}
            _hover={{ color: "brand.teal" }}
            color="brand.white"
          >
            About us
          </Text>
          <Text
            cursor="pointer"
            mt={{ base: "20px", lg: "0" }}
            ml={{ base: "0", lg: "100px" }}
            _hover={{ color: "brand.teal" }}
            color="brand.white"
          >
            How it works
          </Text>
        </Flex>
        { getUser ?
            <CustomButton
            bg="brand.teal"
            color="brand.white"
            mt={{ base: "20px", lg: "0" }}
            d={{ base: "none", lg: "flex" }}
            hoverColor="brand.primary"
            >
            Connected
            </CustomButton>
            :
            <CustomButton bg="none" border="1px solid #15F4CB" color="brand.white" hoverColor="brand.teal" mt={{ base: "20px", lg: "0" }} isLoading={isLoading} d={{ base: "none", lg: "flex" }} onClick={connect}>Authenticate</CustomButton>
        }

      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="20px"
        display={{ base: "flex", lg: "none" }}
      >
        <Link to="/">
          <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
        </Link>
        <Box
          onClick={() => setOpenNavBar(!openNavBar)}
          display={{ base: "block", lg: "none" }}
        >
          {openNavBar ? close : hamburger}
        </Box>
      </Flex>

      {openNavBar && (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          display={{ base: "block", lg: "flex" }}
          height={{ base: "100vh", lg: "" }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-around"
            display={{ base: "block", lg: "flex" }}
            w="100%"
          >
            <Text
              cursor="pointer"
              textAlign="center"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              About us
            </Text>
            <Text
              cursor="pointer"
              textAlign="center"
              mt={{ base: "20px", lg: "0" }}
              ml={{ base: "0", lg: "100px" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              How it works
            </Text>
          </Flex>
          {
            getUser ? 
            <CustomButton
                bg="none"
                color="brand.white"
                mt={{ base: "20px", lg: "0" }}
                w="100%"
                hoverColor="brand.teal"
                border="1px solid #15F4CB"
            >
                Connected
            </CustomButton>
            : 
            <CustomButton bg="none" color="brand.white" hoverColor="brand.teal"
            border="1px solid #15F4CB" mt={{ base: "20px", lg: "0" }} isLoading={isLoading} w="100%" onClick={connect}>Authenticate</CustomButton>
          }
        </Flex>
      )}
    </>
  );
};

export default Navbar;
