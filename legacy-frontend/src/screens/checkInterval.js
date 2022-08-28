import { Box, Flex, Image, Select, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import logo from "../../src/icons/logo.svg";

const CheckInterval = ({ getInterval, handleProceedToSuccess }) => {
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

      <Box m="40px auto" w="80%">
        <Text fontSize="40px" textAlign="center">Select Check in Interval</Text>
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
        </Box>
      </Box>
    </Box>
  );
};

export default CheckInterval;
