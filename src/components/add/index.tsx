import { Box, Text, Image, Flex } from "@chakra-ui/react";
import ads from "@assets/ads.jpeg";

const Add = () => {
  return (
    <Box
      px={["9%"]}
      bg="brand.1000"
      width="100%"
      borderRadius="8px"
      padding="8px"
      gap="8px"
    >
      <Flex justifyContent="center" height="180px">
        <Image maxHeight="100%" maxWidth="100%" objectFit="contain" src={ads} />
      </Flex>
    </Box>
  );
};

export default Add;
