import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import logo from '../../src/icons/logo.svg';
import { transfer } from "../utils/svg";

const SelectTokens = ({ handdleProceed }) => {
    const tokens = ['My Algo Token', 'New Kinetics', 'Jiggy', 'Killatunez' ]
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

            <Box m="40px auto">
                <Text fontSize="65px" fontWeight="600" color="brand.dark">SELECT TOKENS</Text>
                <Text color="brand.primary">
                    Kindly select all of your tokens you would like to transfer it's
                    asset to <br/>your next of kin.
                </Text>

                <Box bg="brand.dark" w="100%" m="40px auto" p="20px" borderRadius="10px">
                    <CustomButton bg="brand.primary" color="brand.white" mb="30px" hoverColor="brand.yellow">Select All</CustomButton>
                    <SimpleGrid columns="4" spacing="10">
                        {tokens.map((res) => (
                            <Box w="230px">
                                <Flex color="brand.dark" bg="brand.white" p="15px" h="95px" borderRadius="10px" alignItems="center" justifyContent="center">
                                    <Text>{res}</Text>
                                </Flex>
                                <Flex color="brand.white" alignItems="center" cursor="pointer" _hover={{ color: 'brand.yellow' }} fontSize="14px" justifyContent="space-between" p="10px 20px">
                                    <Box>{transfer}</Box>
                                    <Text>Transfer</Text>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
                <CustomButton onClick={handdleProceed}>Proceed</CustomButton>
            </Box>
        </Box>
    )
};

export default SelectTokens;