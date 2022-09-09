import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import logo from '../../src/icons/logo.svg';
import { loading } from "../utils/svg";
import { useEffect, useState } from "react";
import {ethers} from "ethers";
import { toaster } from "evergreen-ui";

const SelectTokens = ({ handleProceed }) => {
    const [tokens, setTokens] = useState([]);
    const [selectedTokens, setSelectedTokens] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [getTokensLoading, setGetTokensLoading] = useState(false);

    const getUser = () => {
        return localStorage.getItem('legacy_user');
    }

    useEffect(() => {
        setGetTokensLoading(true);
        const user = getUser();
        if(!user) {
            return;
        }
        try {
            const url = new URL(`https://deep-index.moralis.io/api/v2/${user}/erc20?chain=goerli`);
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': '4QdwNluHelpTw9qmoAXTsaodpYXP1E1cpdrRmqbTGf9sPhO9hBFPrRydJxkl5TPP'
                }
            }).then(async(res) => {
                const res_json = await res.json();
                // console.log(res_json);
                setTokens(res_json);
                setGetTokensLoading(false);
                // console.log(tokens);
            })
        } catch (error) {
            console.log(error);
            setGetTokensLoading(false);
        }
    }, []);

    const approve = async (tokenAddress) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const legacyAddress = "0x73ce644D070c0e2D7aA581Df87444dbE55B88736";
        const signer = provider.getSigner();

        setIsLoading(true);
        const erc20Abi = ["function approve(address _legatee, uint256 _checkInterval)"];
        const token = new ethers.Contract(tokenAddress, erc20Abi, signer);
        await token.approve(legacyAddress, ethers.constants.MaxUint256);
        setIsLoading(false);
    }

    const addTokens = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const legacyAddress = "0x73ce644D070c0e2D7aA581Df87444dbE55B88736";
        const signer = provider.getSigner();
        console.log(selectedTokens)
        let tokenAddresses = selectedTokens.map((tkn) => tkn.token_address);

        // User approve contract to have access to their token
        try {
            console.log(tokenAddresses);
            // Add tokens to Legacy
            const legacyAbi = ["function addTokens(address[] memory _tokens)"];
            const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
            // console.log(tokenAddresses)
            const tx = await legacy.addTokens(tokenAddresses);
            await tx.wait();
        } catch (error) {
            console.log(error);
            toaster.danger('An error occured!');
            setIsLoading(false);
            return;
        }


        handleProceed();
    }

    const later = () => {
        handleProceed();
    } 

    const selectToken = (token) => {
        try {
            approve(token.token_address)
        } catch (error) {
            console.log(error);
        }
        setSelectedTokens([...selectedTokens, token]);
        toaster.success(`${token.symbol} successfully selected`);
    }

    const selectAll = () => {
        setSelectedTokens(tokens);
        tokens.map((token) => approve(token.token_address));
        toaster.success(`All tokens successfully selected`);
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
            <Box m="40px auto">
                <Text fontSize="65px" fontWeight="600" color="brand.dark">SELECT TOKENS</Text>
                <Text color="brand.primary">
                    Kindly select all of your tokens you would like to transfer it's
                    asset to <br/>your next of kin.
                </Text>
                <Box bg="#F9F9F9" w="100%" m="40px auto" p="40px 30px" borderRadius="10px">
                    {getTokensLoading ? loading : 
                        <>
                            <CustomButton bg="brand.primary" color="brand.white"  mb="30px" hoverColor="brand.yellow" onClick={selectAll}>Select All</CustomButton>
                            <SimpleGrid columns="4" spacing="10">
                                {tokens.length ? tokens.map((token) => (
                                    <Box w="230px" boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" borderRadius="10px">
                                        <Flex color="brand.dark" bg="brand.white" p="15px" h="95px" borderRadius="10px" alignItems="center" justifyContent="center">
                                            <Text>{token.symbol}</Text>
                                        </Flex>
                                        <Flex color="brand.dark" alignItems="center" cursor="pointer" _hover={{ color: 'brand.primary' }} fontSize="14px" justifyContent="space-between" p="10px 20px">
                                            <Text fontSize="10px" color="brand.primary">Token {token.symbol}</Text>
                                            <Text as="button" cursor="pointer" onClick={() => selectToken(token)}>Select</Text>
                                        </Flex>
                                    </Box>
                                )) :
                                <Text color="brand.primary">You currently do not have any token</Text>
                                }
                            </SimpleGrid>
                        </>
                    }
                </Box>
	    	    <CustomButton onClick={later} ml="20px">Later</CustomButton>
                <CustomButton isLoading={isLoading} onClick={addTokens} ml="20px">Proceed</CustomButton>
            </Box>
        </Box>
    )
};

export default SelectTokens;
