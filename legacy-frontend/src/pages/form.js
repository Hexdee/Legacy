import { Box, Flex, Image, Text } from "@chakra-ui/react";
import logo from '../../src/icons/logo.svg';
import CustomButton from "../common/CustomButton";
import TextInput from "../common/TextInput";
import {ethers} from "ethers";
import { useState } from "react";
import { toaster } from "evergreen-ui";
import { Link, useNavigate } from "react-router-dom";

const Form = () => {
  let navigate = useNavigate();
  const [legatee, setLagatee] = useState("");
  const [checkInterval, setCheckInterval] = useState();
  const [createLoading, setCreateLoading] = useState(false);

  const create = async(e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const legacyAddress = "0x3113ee4eD0637F2f0EE49Eeb0cFF8D7cAf2D79A8";
      const legacyAbi = ["function create(address _legatee, uint256 _checkInterval)"]
      const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
      //TODO
      //Display loader
      const tx = await legacy.create(legatee, checkInterval * 3600 * 24);
      await tx.wait;
      localStorage.setItem('has_legacy', 'true');
      setCreateLoading(false);
    } catch (error) {
      toaster.danger("Error occured! Legacy already exist");
      setCreateLoading(false);
      return;
    }
    navigate('select-token');
  }

  const handleLegateeChange = (event) => {
    setLagatee(event.target.value);
  }

  const handleCheckIntervalChange = (event) => {
    setCheckInterval(event.target.value);
  }  


  return (
    <Box padding="30px 80px">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" justifyContent="space-around">
          <Link to="/">
            <Image w="60px" src={logo} alt="logo" />
          </Link>
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
          Connected
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
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                />

                <TextInput
                    label="Name of your next of kin"
                    placeholder="Enter your next of kin name"
                    type="text"
                />

                <TextInput
                    label="Next of kin wallet address"
                    placeholder="Enter your next of kin wallet address"
                    type="text"
                    onChange={handleLegateeChange}
                />
                <TextInput
                    label="CheckInterval(In Days)"
                    placeholder="Enter how frequently you want to check in"
                    type="number"
                    onChange={handleCheckIntervalChange}
                />
                <CustomButton mt="20px" w="100%" bg="brand.primary" color="brand.white" hoverColor="brand.yellow" isLoading={createLoading} onClick={create}>Secure Now</CustomButton>
            </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
