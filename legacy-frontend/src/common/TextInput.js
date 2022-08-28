import { Box, FormLabel, Input } from "@chakra-ui/react";

const TextInput = ({ label, placeholder, onChange, type, w, value }) => {
    return (
        <Box mt="20px">
            <FormLabel color="brand.primary" fontSize="14px" fontWeight="300">{label}</FormLabel>
            <Input bg="brand.white" fontSize="14px" h="55px" w={w} placeholder={placeholder} value={value} onChange={onChange} type={type} />
        </Box>
    )
}

export default TextInput;
