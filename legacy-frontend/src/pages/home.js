import { Box, Flex, Image, Text } from '@chakra-ui/react';
import logo from '../../src/icons/logo.svg';
import CustomButton from '../common/CustomButton';
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import img from '../images/bg.jpeg';
import { toaster } from 'evergreen-ui';
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [getStartedLoading, setGetStartedLoading] = useState(false);
    useEffect(() => {
        setUser(getUser);
    }, [user]);
    
    const getUser = () => {
        return localStorage.getItem('legacy_user')
    }

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
    
    const handlegetstarted = () => {
        setGetStartedLoading(true);
        if (getUser()) {
            navigate('/get-started')
            setGetStartedLoading(false);
        }
        else {
            toaster.danger('Please connect wallet first!', {
                duration: 10
            });
            setGetStartedLoading(false);
        }
    }
    return (
        <Box padding="30px 80px">
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center" justifyContent="space-around">
                    <Link to="/">
                        <Image w="60px" src={logo} alt="logo" />
                    </Link>
                    <Text cursor="pointer" ml="100px" _hover={{ color: 'brand.primary' }}>About us</Text>
                    <Text cursor="pointer" ml="100px" _hover={{ color: 'brand.primary' }}>How it works</Text>
                </Flex>
                {
                    getUser() ? 
                    <CustomButton bg="brand.yellow" color="brand.white" hoverColor="brand.primary" isLoading={isLoading} onClick={connect}>Connected</CustomButton> :
                    <CustomButton bg="brand.primary" color="brand.white" hoverColor="brand.yellow" isLoading={isLoading} onClick={connect}>Authenticate</CustomButton>
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

                    <CustomButton mt="30px" bg="brand.primary" color="brand.white" hoverColor="brand.yellow" isLoading={getStartedLoading} onClick={handlegetstarted}>Get Started</CustomButton>
                </Box>
                
                <Box width="50%" borderRadius="10px">
                    <Image src={img} alt="img" />
                </Box>

            </Flex>

        </Box>
    )
};

export default Home;