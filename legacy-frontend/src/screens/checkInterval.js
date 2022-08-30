import { Box, Flex, Image, Select, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import logo from "../../src/icons/logo.svg";
import {ethers} from "ethers";
import { useEffect, useState } from "react";
import { toaster } from "evergreen-ui";
import TextInput from "../common/TextInput";

const CheckInterval = ({ handleSecureNow, handleProceedToSuccess }) => {
  const [legatee, setLegatee] = useState();
  const [interval, setInterval] = useState();
  const [lastSeen, setLastSeen] = useState();
  const [checkInLoading, setCheckInLoading] = useState(false);

  useEffect(() => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const legacyAddress = "0x3113ee4eD0637F2f0EE49Eeb0cFF8D7cAf2D79A8";
      const legacyAbi = ["function legacies(uint256) view returns (address, address, uint256, uint256, bool)",
        "function legacyIndexes(address owner) view returns(uint256)"
      ];
      const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
      //TODO
      //Display loader
      legacy.legacyIndexes(getUser()).then((index) => {
        legacy.legacies(Number(index)).then((res) => {
          setLegatee(res[1]);
          //Convert lastSeen to minutes (just for the sake of demo)
          let ls = Math.floor( ((Number(new Date()) / 1000) - Number(res[2])) / (3600 * 24) );
          setLastSeen(ls == 0 ? "Today" : `${ls} days ago`);
          //Convert checkInterval to seconds (just for the sake of demo)
          const secs = Number(res[3]);
          const intervalMins = Math.floor(secs / (3600 * 24));
          setInterval(`Every ${intervalMins} days`);
        })
      })
    } catch (error) {
      toaster.danger('An error occured!')
      return;
    }
  }, [])

  const getUser = () => {
    return localStorage.getItem('legacy_user');
  }

  const checkIn = async (e) => {
    e.preventDefault();
    setCheckInLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const legacyAddress = "0xA75ef045964896E28574A2ffB13bC58c63950bCC";
      const legacyAbi = ["function checkIn()"];
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
    handleProceedToSuccess();
  }

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
          Connected
        </CustomButton>
      </Flex>

      <Box m="40px auto" w="60%">
        <Text fontSize="40px" textAlign="center">Your Profile Page</Text>
        <Box w="60%" m="40px auto">
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
        <CustomButton w="60%" d="flex" m="10px auto" bg="brand.primary" hoverColor="brand.yellow" color="brand.white" isLoading={checkInLoading} onClick={checkIn}>Check In</CustomButton>
        <CustomButton w="60%" d="flex" m="30px auto" bg="brand.primary" hoverColor="brand.yellow" color="brand.white">Edit my Legacy</CustomButton>
        <CustomButton w="60%" d="flex" m="30px auto" bg="brand.primary" hoverColor="brand.yellow" color="brand.white" onClick={handleSecureNow}>Add Token</CustomButton>
        {/* <Text fontSize="40px" textAlign="center">Select Check in Interval</Text>
        <Box fontSize="14px" m="0 auto">
            <form>
                <Select
                        placeholder="Choose check in interval"
                        h="50px"
                        bg="brand.white"
                        w="60%"
                        m="20px auto"
                        onChange={(e) => getInterval(e.target.value)}
                    >
                        <option value="annually">
                        <Text>Annually</Text>
                        </option>
                        <option value="monthly">
                        <Text>Monthly</Text>
                        </option>
                        <option value="weekly">
                        <Text>Weekly</Text>
                        </option>
                        <option value="daily">
                        <Text>Daily</Text>
                        </option>
                </Select>
            </form>
        </Box>
      </Box>

      <Box m="40px auto" w="80%">
        <Text fontSize="40px" textAlign="center">Check in today?</Text>
        <Box fontSize="14px" m="0 auto">
            <form>
                <Select
                        placeholder="Do you want to check in today?"
                        h="50px"
                        bg="brand.white"
                        w="60%"
                        m="20px auto"
                        onChange={(e) => getInterval(e.target.value)}
                    >
                        <option value="yes">
                        <Text>Yes</Text>
                        </option>
                        <option value="no">
                        <Text>No</Text>
                        </option>
                </Select>

                <CustomButton w="60%" d="flex" m="10px auto" bg="brand.primary" hoverColor="brand.yellow" color="brand.white" onClick={handleProceedToSuccess}>Proceed</CustomButton>
            </form>
        </Box> */}
      </Box>
    </Box> 
  );
};

export default CheckInterval;
