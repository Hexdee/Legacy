import { Box, Flex, Image, Text } from '@chakra-ui/react';
import CustomButton from '../common/CustomButton';
import { useEffect, useState } from 'react';
import img from '../images/bg.jpeg';
import { toaster } from 'evergreen-ui';
import { useNavigate } from "react-router-dom";
import Navbar from '../navbar/navbar';


const Home = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState("");
    const [getStartedLoading, setGetStartedLoading] = useState(false);
    useEffect(() => {
        setUser(getUser);
    }, [user]);
    
    const getUser = () => {
        return localStorage.getItem('legacy_user')
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
        <Box padding={{ base: '10px 40px', lg: "30px 80px"}}>
            <Navbar />

            <Flex mt={{ base: '50px', lg: "100px"}} alignItems="center" display={{ base: 'block', lg: 'flex' }}>
                <Box width={{ base: '100%', lg: "50%"}}>
                    <Box fontSize={{ base: '30px', lg: '65px' }} fontWeight="700">
                        <Text>What happens to</Text>
                        <Flex>
                            <Text mr={{ base: '5px', lg: "15px"}}>your</Text>
                            <Text  mr={{ base: '5px', lg: "15px"}} color="brand.primary">Assets</Text>
                            <Text>if you</Text>
                        </Flex>
                        <Text>DIE today?</Text>
                    </Box>
                    <Text color="brand.primary" mt={{ base: '15px', lg: "30px"}}>
                        Secure your assets with a trusted member of your
                        family (automatically your next kin)
                    </Text>

                    <CustomButton mt={{ base: '15px', lg: "30px"}} bg="brand.primary" color="brand.white" hoverColor="brand.yellow" isLoading={getStartedLoading} onClick={handlegetstarted}>Get Started</CustomButton>
                </Box>
                
                <Box width={{ base: '100%', lg: '50%' }} m={{ base: '20px 0', lg: '0' }} borderRadius="10px">
                    <Image src={img} alt="img" />
                </Box>

            </Flex>
        </Box>
    )
};

export default Home;