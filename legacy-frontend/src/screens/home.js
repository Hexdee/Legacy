import { Box, Flex, Image, Text } from '@chakra-ui/react';
import logo from '../../src/icons/logo.svg';
import CustomButton from '../common/CustomButton';
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
const img = "https://res.cloudinary.com/dboqyj4bp/image/upload/v1661631737/business-home-asset-ideas-concept-with-beautiful-smart-asian-woman-hand-protect-house-model-with-happiness-confident_wxfmet.jpg;"


const Home = ({ handleGetStarted }) => {
    const [user, setUser] = useState("");
    useEffect(() => {
        setUser(getUser);
    }, [user]);
    
    const getUser = () => {
        return localStorage.getItem('legacy_user')
    }

    const connect = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            localStorage.setItem('legacy_user', address);
            setUser(address);
        } catch(error) {
            console.log(error);
            alert("An error occured!");
        }
    }
    
    const handlegetstarted = () => {
        if (getUser()) {
            handleGetStarted();
        }
        else {
            alert("Please connect wallet first!");
        }
    }
    return (
        <Box padding="30px 80px">
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center" justifyContent="space-around">
                    <Image w="60px" src={logo} alt="logo" />
                    <Text cursor="pointer" ml="100px" _hover={{ color: 'brand.primary' }}>About us</Text>
                    <Text cursor="pointer" ml="100px" _hover={{ color: 'brand.primary' }}>How it works</Text>
                </Flex>
                {
                    getUser() ? 
                    <CustomButton bg="brand.primary" color="brand.white" hoverColor="brand.yellow" onClick={connect}>Connected</CustomButton> :
                    <CustomButton bg="brand.primary" color="brand.white" hoverColor="brand.yellow" onClick={connect}>Authenticate</CustomButton>
                }
            </Flex>

            <Flex mt="100px" alignItems="center">
                <Box width="50%">
                    <Box fontSize="65px" fontWeight="700">
                        <Text>What happens to</Text>
                        <Flex>
                            <Text mr="15px">your</Text>
                            <Text  mr="15px" color="brand.primary">Assets</Text>
                            <Text>if you</Text>
                        </Flex>
                        <Text>DIE today?</Text>
                    </Box>
                    <Text color="brand.primary">
                        Secure your assets with a trusted member of your<br/>
                        family (automatically your next kin)
                    </Text>

                    <CustomButton mt="30px" bg="brand.primary" color="brand.white" hoverColor="brand.yellow" onClick={handlegetstarted}>Get Started</CustomButton>
                </Box>
                
                <Box width="50%" borderRadius="10px">
                    <Image src={img} alt="img" />
                </Box>

            </Flex>

        </Box>
    )
};

export default Home;