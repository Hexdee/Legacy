import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../src/assets/icons/logo.svg";
import { close, hamburger } from "../assets/svgs/svg";
import CustomButton from "../common/CustomButton";
import { toaster } from "evergreen-ui";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openNavBar, setOpenNavBar] = useState(false);
  const [user, setUser] = useState("");
  const [isConnnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUser(getUser);
  }, [user]);

  const disConnect = () => {
    setIsConnected(false);
  }

  const getUser = localStorage.getItem('legacy_user');

  const connect = async () => {
    setIsLoading(true);
    try {
        alert("Are you sure you want to connect wallet, This would let Legacy have view your wallet address and balance");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        localStorage.setItem('legacy_user', address);
        setUser(address);
        setIsConnected(true);
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
            {location.pathname !== '/' ? 'Go Home' : 'About Us'}
          </Text>
          <Text
            cursor="pointer"
            mt={{ base: "20px", lg: "0" }}
            ml={{ base: "0", lg: "100px" }}
            _hover={{ color: "brand.teal" }}
            color="brand.white"
          >
            {location.pathname !== '/' ? '' : 'How it Works'}
          </Text>
        </Flex>
        {location.pathname === '/' ?
          <CustomButton bg="none" border="1px solid #A168DA" color="brand.white" hoverColor="brand.lightPurple" mt={{ base: "20px", lg: "0" }} d={{ base: "none", lg: "flex" }} onClick={() => navigate('/demo')}>View demo</CustomButton>
          :
          <Box>
          { isConnnected ?
              <CustomButton
              bg="brand.teal"
              color="brand.white"
              mt={{ base: "20px", lg: "0" }}
              d={{ base: "none", lg: "flex" }}
              hoverColor="brand.primary"
              onClick={disConnect}
              >
              Disconnect
              </CustomButton>
              :
              <CustomButton bg="none" border="1px solid #A168DA" color="brand.white" hoverColor="brand.lightPurple" mt={{ base: "20px", lg: "0" }} isLoading={isLoading} d={{ base: "none", lg: "flex" }} onClick={connect}>Connect Wallet</CustomButton>
          }
        </Box>
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
              {location.pathname !== '/' ? 'Go Home' : 'About Us'}
            </Text>
            <Text
              cursor="pointer"
              textAlign="center"
              mt={{ base: "20px", lg: "0" }}
              ml={{ base: "0", lg: "100px" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              {location.pathname !== '/' ? '' : 'How it Works'}
            </Text>
          </Flex>
          {location.pathname === '/' ? 
            <CustomButton bg="none" border="1px solid #A168DA" color="brand.white" hoverColor="brand.lightPurple" mt={{ base: "20px", lg: "0" }} d={{ base: "flex", lg: "none" }} w="100%" onClick={() => navigate('/demo')}>View demo</CustomButton>
            :
          <Box>
            {
              getUser ? 
              <CustomButton
                  bg="none"
                  color="brand.white"
                  mt={{ base: "20px", lg: "0" }}
                  w="100%"
                  hoverColor="brand.teal"
                  border="1px solid #A168DA"
              >
                  Disconect
              </CustomButton>
              : 
              <CustomButton bg="none" color="brand.white" hoverColor="brand.teal"
              border="1px solid #15F4CB" mt={{ base: "20px", lg: "0" }} isLoading={isLoading} w="100%" onClick={connect}>Connect Wallet</CustomButton>
            }
          </Box>
        }
        </Flex>
      )}
    </>
  );
};

export default Navbar;
