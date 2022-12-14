/* eslint-disable no-implied-eval */
import { Box, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import {ethers} from "ethers";
import { useEffect, useState } from "react";
import { toaster } from "evergreen-ui";
import TextInput from "../common/TextInput";
import { useNavigate } from "react-router-dom";
import getUserInterval from "../utils/helpers";
import Navbar from "../navbar/navbar";
import {
  checkConnection,
  isDisconnected,
  addTokens
} from "../utils/helpers.js"
import { legacyAddress, legacyAbi } from "../utils/contract";


const CheckInterval = () => {
  const navigate = useNavigate();
  const [legatee, setLegatee] = useState();
  const [interval, setInterval] = useState();
  const [lastSeen, setLastSeen] = useState();
  const [checkInLoading, setCheckInLoading] = useState(false);

  const getLegacy = async() => {
    console.log((await checkConnection()));
    const legacy = await getUserInterval(await checkConnection());
    console.log(legacy)
    setInterval(legacy.interval);
    setLastSeen(legacy.lastSeen);
    setLegatee(legacy.legatee);
  }

  useEffect(() => {
    getLegacy()
  }, [])

  const checkIn = async (e) => {
    e.preventDefault();
    setCheckInLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
      //TODO
      //Display loader
      const tx = await legacy.checkIn();
      await tx.wait;
      setCheckInLoading(false);
    } catch (error) {
      toaster.danger("An error occured!");
      setCheckInLoading(false);
      return;
    }
    navigate('/success');
  }

  return (
    <Box padding={{ base: '10px 40px', lg: "30px 80px"}}>
      <Navbar />

      <Box m="40px auto" w={{ base: '100%', lg: "60%"}}>
        <Text fontSize={{ base: '25px', lg: "40px"}} textAlign="center">Your Profile Page</Text>
        <Box w={{ base: '90%', lg: "60%"}} m="40px auto">
         <TextInput
            label="Next of kin"
            value={legatee}
          />
          <TextInput
            label="CheckIn Interval"
            value={interval}
          />
          <TextInput
            label="Last seen"
            value={lastSeen}
          />
        </Box>
        <CustomButton w={{ base: '90%', lg: "60%"}} d="flex" m="10px auto" bg="brand.primary" hoverColor="brand.yellow" color="brand.white" isLoading={checkInLoading} onClick={checkIn}>Check In</CustomButton>
        <CustomButton w={{ base: '90%', lg: "60%"}} d="flex" m="30px auto" bg="brand.primary" hoverColor="brand.yellow" color="brand.white" onClick={() => navigate('/get-started')}>Edit my Legacy</CustomButton>
        <CustomButton w={{ base: '90%', lg: "60%"}} d="flex" m="30px auto" bg="brand.primary" hoverColor="brand.yellow" color="brand.white" onClick={() => navigate('/select-token')}>Add Token</CustomButton>
      </Box>
    </Box> 
  );
};

export default CheckInterval;
